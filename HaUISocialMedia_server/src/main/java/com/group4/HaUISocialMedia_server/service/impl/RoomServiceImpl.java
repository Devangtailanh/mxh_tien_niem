package com.group4.HaUISocialMedia_server.service.impl;


import com.group4.HaUISocialMedia_server.dto.*;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.MessageRepository;
import com.group4.HaUISocialMedia_server.repository.RoomRepository;
import com.group4.HaUISocialMedia_server.repository.RoomTypeRepository;
import com.group4.HaUISocialMedia_server.repository.UserRoomRepository;
import com.group4.HaUISocialMedia_server.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.*;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRoomRepository userRoomRepository;

    @Autowired
    private MessageTypeService messageTypeService;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private UserRoomService userRoomService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RelationshipService relationshipService;

    @Override
    public List<UserDto> getAllJoinedUsersByRoomId(UUID roomId) {
        if (!isInRoomChat(roomId)) return null;

        Room room = roomRepository.findById(roomId).orElse(null);

        List<UserDto> res = new ArrayList<>();
        for (UserRoom ur : room.getUserRooms()) {
            res.add(new UserDto(ur.getUser()));
        }

        return res;
    }

    @Override
    public RoomDto createRoom(RoomDto dto) {
        if (roomRepository.findById(dto.getId()).orElse(null) != null)
            return null;

        Room room = new Room();
        room.setName(dto.getName());
        room.setAvatar(dto.getAvatar());
        room.setCode(dto.getCode());
        room.setCreateDate(new Date());
        room.setDescription(dto.getDescription());
        room.setColor(dto.getColor());
        RoomType roomType = roomTypeRepository.findByName("public");
        room.setRoomType(roomType);
        // room.setRelationship(dt);
        //room.setRoomType();
        return new RoomDto(roomRepository.save(room));
    }

    @Override
    public RoomDto updateRoom(RoomDto dto) {
        if(dto == null) return null;

        User currentUser = userService.getCurrentLoginUserEntity();
        if(currentUser == null) return null;

        Room room = roomRepository.findById(dto.getId()).orElse(null);
        if (room == null)
            return null;

        if(dto.getName() != null && !dto.getName().equals(room.getName())){
            room.setName(dto.getName());

            //notify other users that props of room has been changed
            MessageDto messageDto = new MessageDto();
            messageDto.setRoom(dto);
            messageDto.setContent(currentUser.getUsername() + " đã cập nhật tên cuộc trò chuyện");
            messageDto.setUser(new UserDto(currentUser));
            messageDto.setMessageType(messageTypeService.getMessageTypeByName("notification"));

            messageService.sendMessage(messageDto);
        }

        if(dto.getAvatar() != null && !dto.getAvatar().equals(room.getAvatar())){
            room.setAvatar(dto.getAvatar());

            //notify other users that props of room has been changed
            MessageDto messageDto = new MessageDto();
            messageDto.setRoom(dto);
            messageDto.setContent(currentUser.getUsername() + " đã cập nhật ảnh cuộc trò chuyện");
            messageDto.setUser(new UserDto(currentUser));
            messageDto.setMessageType(messageTypeService.getMessageTypeByName("notification"));

            messageService.sendMessage(messageDto);
        }

        room.setCode(dto.getCode());

        if(dto.getDescription() != null && !dto.getDescription().equals(room.getDescription())){
            room.setDescription(dto.getDescription());

            //notify other users that props of room has been changed
            MessageDto messageDto = new MessageDto();
            messageDto.setRoom(dto);
            messageDto.setContent(currentUser.getUsername() + " đã cập nhật ghi chú cuộc trò chuyện");
            messageDto.setUser(new UserDto(currentUser));
            messageDto.setMessageType(messageTypeService.getMessageTypeByName("notification"));

            messageService.sendMessage(messageDto);
        }

        if (dto.getColor() != null && !dto.getColor().equals(room.getColor())) {
            room.setColor(dto.getColor());

            //notify other users that props of room has been changed
            MessageDto messageDto = new MessageDto();
            messageDto.setRoom(dto);
            messageDto.setContent(currentUser.getUsername() + " đã cập nhật màu sắc cuộc trò chuyện");
            messageDto.setUser(new UserDto(currentUser));
            messageDto.setMessageType(messageTypeService.getMessageTypeByName("notification"));

            messageService.sendMessage(messageDto);
        }

        if (room.getUserRooms().size() >= 3) {
            RoomType roomType = roomTypeRepository.findByName("group");
            room.setRoomType(roomType);
        } else {
            RoomType roomType = roomTypeRepository.findByName("private");
            room.setRoomType(roomType);
        }

        return new RoomDto(roomRepository.saveAndFlush(room));
    }

    @Override
    @Modifying
    @Transactional
    public boolean deleteRoom(UUID roomId) {
        if (roomRepository.findById(roomId).orElse(null) == null)
            return false;
        roomRepository.deleteById(roomId);
        return true;
    }

    @Override
    public RoomDto getRoomById(UUID roomId) {
        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null)
            return null;

        RoomDto response = new RoomDto(room);
        List<UserDto> partticipants = getAllJoinedUsersByRoomId(room.getId());
        List<MessageDto> messages = messageService.get20LatestMessagesByRoomId(response.getId());

        response.setParticipants(partticipants);
        response.setMessages(messages);

        return response;
    }

    @Override
    public List<RoomDto> searchRoom(SearchObject searchObject) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;
        List<UserRoom> userRooms = userRoomRepository.findAllRoomByUser(currentUser.getId(), searchObject.getKeyWord());
        if (userRooms == null) return null;
        List<RoomDto> rooms = new ArrayList<>();
        Set<UUID> roomIdSet = new HashSet<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();

            if (roomIdSet.contains(room.getId())) continue;
            roomIdSet.add(room.getId());

            RoomDto roomDto = handleAddJoinedUserIntoRoomDTO(room);
            List<MessageDto> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());

            roomDto.setMessages(messages);
            rooms.add(roomDto);
        }

        sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }

    @Override
    public RoomDto createGroupChat(NewGroupChat newGroupChat) {
        if (newGroupChat == null) return null;
        UUID joinUserIds[] = newGroupChat.getJoinUserIds();
        if (joinUserIds == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<User> joiningUsers = new ArrayList<>();
        joiningUsers.add(currentUser);
        for (UUID joinUserId : joinUserIds) {
            User joinUser = userService.getUserEntityById(joinUserId);
            if (joinUser == null) return null;
            joiningUsers.add(joinUser);
        }

        Room roomChat = new Room();
        Set<UserRoom> userRooms = new HashSet<>();
        //chatRoom firstly declared in database
        roomChat = roomRepository.save(roomChat);

        UserRoom creator = new UserRoom();
        creator.setRoom(roomChat);
        creator.setUser(currentUser);
        creator.setRole("Admin");
        creator.setJoinDate(new Date());
        UserRoom creatorUserRoom = userRoomRepository.save(creator);
        userRooms.add(creatorUserRoom);

        for (User user : joiningUsers) {
            if (user.getId().equals(currentUser.getId())) continue;
            UserRoom ur = new UserRoom();
            ur.setRoom(roomChat);
            ur.setUser(user);
            ur.setRole("Participant");
            ur.setJoinDate(new Date());
            UserRoom userRoom = userRoomRepository.save(ur);
            userRooms.add(userRoom);
        }

        roomChat.setName("Bạn và  " + joinUserIds.length + " người khác");
        if (newGroupChat.getName() != null && !newGroupChat.getName().isEmpty())
            roomChat.setName(newGroupChat.getName());

        roomChat.setUserRooms(userRooms);
        RoomType roomType = roomTypeService.getRoomTypeEntityByName("group");
        roomChat.setRoomType(roomType);

        //chatRoom is finally created done in database
        Room response = roomRepository.save(roomChat);

        MessageType messageType = messageTypeService.getMessageTypeEntityByName("join");

        //send message that creator had created this conversation
        Message creatorMessage = new Message();
        creatorMessage.setMessageType(messageType);
        creatorMessage.setRoom(response);
        creatorMessage.setUser(currentUser);
        creatorMessage.setSendDate(new Date());
        creatorMessage.setContent(currentUser.getUsername() + " đã tạo cuộc trò chuyện");

        Message savedCreatorMessage = messageRepository.save(creatorMessage);

        List<MessageDto> spreadMessages = new ArrayList<>();
        spreadMessages.add(new MessageDto(savedCreatorMessage));

        for (User user : joiningUsers) {
            if (currentUser.getId().equals(user.getId())) continue;
            //send message each user had joined this conversation
            Message userMessage = new Message();
            userMessage.setMessageType(messageType);
            userMessage.setRoom(response);
            userMessage.setUser(user);
            userMessage.setContent(user.getUsername() + " đã tham gia cuộc trò chuyện");
            userMessage.setSendDate(new Date());

            Message savedUserMessage = messageRepository.save(userMessage);

            spreadMessages.add(new MessageDto(savedUserMessage));
        }

        for (MessageDto messageDTO : spreadMessages) {
            for (User userIn : joiningUsers) {
                simpMessagingTemplate.convertAndSendToUser(userIn.getId().toString(), "/privateMessage", messageDTO);

                if (!userIn.getId().equals(currentUser.getId())) {
                    NotificationDto noti = new NotificationDto();
                    noti.setContent(currentUser.getUsername() + " đã thêm bạn vào cuộc trò chuyện mới");
                    noti.setCreateDate(new Date());
                    noti.setActor(new UserDto(currentUser));

                    simpMessagingTemplate.convertAndSendToUser(userIn.getId().toString(), "/notification", noti);
                }
            }
        }

        return new RoomDto(response);
    }

    @Override
    public RoomDto unjoinGroupChat(UUID groupChatId) {
        if (!isInRoomChat(groupChatId)) return null;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        Room unjoinRoom = roomRepository.findById(groupChatId).orElse(null);
        if (unjoinRoom == null) return null;
        UserRoom userRoom = userRoomRepository.findByUserIdAndRoomId(currentUser.getId(), unjoinRoom.getId());
        if (userRoom == null) return null;

        unjoinRoom = roomRepository.findById(groupChatId).orElse(null);
        RoomDto res = new RoomDto(unjoinRoom);
        res.setParticipants(getAllJoinedUsersByRoomId(res.getId()));
        //notify other users that an user had left this conversation
        MessageDto leftMessageDto = new MessageDto();
        leftMessageDto.setRoom(res);
        leftMessageDto.setContent(currentUser.getUsername() + " left this conversation");
        leftMessageDto.setUser(new UserDto(currentUser));
        leftMessageDto.setMessageType(messageTypeService.getMessageTypeByName("left"));
        messageService.sendMessage(leftMessageDto);

        userRoomService.deleteUserRoom(userRoom.getId());

        return res;
    }

    public RoomDto addUserIntoGroupChat(UUID userId, UUID roomId) {
        if (!isInRoomChat(roomId)) return null;

        if (userId == null || roomId == null) return null;
        UserDto currentLoginUser = new UserDto(userService.getCurrentLoginUserEntity());
        if (currentLoginUser == null) return null;
        User newUser = userService.getUserEntityById(userId);
        if (newUser == null) return null;
        Room addedRoom = roomRepository.findById(roomId).orElse(null);
        if (addedRoom == null) return null;

        //handle add user into room by declare new userroom entity
        UserRoom newUserRoom = new UserRoom();
        newUserRoom.setRole("Member");
        newUserRoom.setNickName(newUser.getUsername());
        newUserRoom.setRoom(addedRoom);
        newUserRoom.setUser(newUser);
        newUserRoom.setJoinDate(new Date());
        UserRoom resEntity = userRoomRepository.save(newUserRoom);

        Room updatedRoom = roomRepository.findById(resEntity.getRoom().getId()).orElse(null);
        if (updatedRoom == null)
            return null;

        RoomDto response = new RoomDto(updatedRoom);

        //notify other users that an user had joined this conversation
        MessageDto joinMessageDto = new MessageDto();
        joinMessageDto.setRoom(response);
        joinMessageDto.setContent(currentLoginUser.getUsername() + " đã thêm " + newUser.getUsername() + " vào cuộc trò chuyện");
        joinMessageDto.setUser(new UserDto(newUser));
        joinMessageDto.setMessageType(messageTypeService.getMessageTypeByName("join"));
        messageService.sendMessage(joinMessageDto);

        response.setParticipants(getAllJoinedUsersByRoomId(updatedRoom.getId()));

        return response;
    }

    @Override
    public boolean isInRoomChat(UUID roomId) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return false;

        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null) return false;

        for (UserRoom ur : room.getUserRooms()) {
            if (ur.getUser().getId().equals(currentUser.getId())) return true;
        }

        return false;
    }

    @Override
    public List<UserDto> getListFriendNotInRoom(UUID roomId) {
        if (!isInRoomChat(roomId)) return null;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null) return null;

        List<UserDto> joinedUsers = roomService.getAllJoinedUsersByRoomId(roomId);
        List<UUID> joinedUserIds = new ArrayList<>();
        for (UserDto joinedUser : joinedUsers) {
            joinedUserIds.add(joinedUser.getId());
        }
        List<UserDto> friendList = relationshipService.getAllFiends();
        List<UserDto> res = new ArrayList<>();

        for (UserDto friendDto : friendList) {
            if (!joinedUserIds.contains(friendDto.getId())) res.add(friendDto);
        }

        return res;
    }

    @Override
    public RoomDto addMultipleUsersIntoGroupChat(UUID[] userIds, UUID roomId) {
        if (userIds == null) return null;
        for (UUID userId : userIds) {
            addUserIntoGroupChat(userId, roomId);
        }

        Room updatedRoom = roomRepository.findById(roomId).orElse(null);
        if (updatedRoom == null)
            return null;

        RoomDto response = new RoomDto(updatedRoom);
        response.setParticipants(getAllJoinedUsersByRoomId(updatedRoom.getId()));
        return response;
    }

    @Override
    public List<RoomDto> getAllJoinedRooms() {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;
        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        List<RoomDto> rooms = new ArrayList<>();
        Set<UUID> roomIdSet = new HashSet<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();

            if (roomIdSet.contains(room.getId())) continue;
            roomIdSet.add(room.getId());

            RoomDto roomDto = handleAddJoinedUserIntoRoomDTO(room);
            List<MessageDto> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());

            roomDto.setMessages(messages);
            rooms.add(roomDto);
        }

        sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }

    @Override
    public List<RoomDto> getAllGroupRooms() {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;

        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        List<RoomDto> rooms = new ArrayList<>();
        Set<UUID> roomIdSet = new HashSet<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();

            if (roomIdSet.contains(room.getId())) continue;
            roomIdSet.add(room.getId());

            if (room.getRoomType().getName().trim().toLowerCase().equals("public")) {
                RoomDto roomDto = handleAddJoinedUserIntoRoomDTO(room);
                List<MessageDto> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());

                roomDto.setMessages(messages);
                rooms.add(roomDto);
            }
        }

        sortRoomDTOInLastestMessagesOrder(rooms);


        return rooms;
    }

    @Override
    public List<RoomDto> getAllPrivateRooms() {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null)
            return null;

        Set<UserRoom> userRooms = currentUser.getUserRooms();
        if (userRooms == null) return null;
        List<RoomDto> rooms = new ArrayList<>();
        Set<UUID> roomIdSet = new HashSet<>();

        for (UserRoom userRoom : userRooms) {
            Room room = userRoom.getRoom();

            if (roomIdSet.contains(room.getId())) continue;
            roomIdSet.add(room.getId());

            if (room.getRoomType().getName().trim().toLowerCase().equals("private")) {
                RoomDto roomDto = this.handleAddJoinedUserIntoRoomDTO(room);
                List<MessageDto> messages = messageService.get20LatestMessagesByRoomId(roomDto.getId());

                roomDto.setMessages(messages);
                rooms.add(roomDto);
            }
        }

        sortRoomDTOInLastestMessagesOrder(rooms);

        return rooms;
    }

    public static void sortRoomDTOInLastestMessagesOrder(List<RoomDto> rooms) {
        Collections.sort(rooms, new Comparator<RoomDto>() {
            @Override
            public int compare(RoomDto o1, RoomDto o2) {
                try {
                    if (o1.getMessages().size() == 0) return 1;
                    if (o2.getMessages().size() == 0) return -1;
                    Date lastMessageRoom1 = o1.getMessages().get(o1.getMessages().size() - 1).getSendDate();
                    Date lastMessageRoom2 = o2.getMessages().get(o2.getMessages().size() - 1).getSendDate();
                    int compareRes = lastMessageRoom1.compareTo(lastMessageRoom2);
                    if (compareRes == -1) return 1;
                    if (compareRes == 1) return -1;
                    return 0;

                } catch (Exception ex) {
                    System.out.println(ex.getMessage());
                    ex.printStackTrace();
                    return 0;
                }
            }
        });
    }

    private RoomDto handleAddJoinedUserIntoRoomDTO(Room room) {
        RoomDto data = new RoomDto(room);
        data.setParticipants(getAllJoinedUsersByRoomId(data.getId()));
        return data;
    }
}
