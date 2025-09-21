package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.NotificationDto;
import com.group4.HaUISocialMedia_server.dto.RelationshipDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.*;
import com.group4.HaUISocialMedia_server.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RelationshipServiceImpl implements RelationshipService {
    @Autowired
    private UserService userService;

    @Autowired
    private RelationshipRepository relationshipRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRoomRepository userRoomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationTypeService notificationTypeService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageTypeService messageTypeService;

    @Override
    public RelationshipDto sendAddFriendRequest(UUID receiverId) {
        Relationship entity = new Relationship();

        User receiver = userService.getUserEntityById(receiverId);
        entity.setReceiver(receiver);

        User requestSender = userService.getCurrentLoginUserEntity();
        entity.setRequestSender(requestSender);

        if (receiver.getId() == requestSender.getId()) return null;

        entity.setState(false);
        entity.setLastModifyDate(new Date());

        Relationship savedEntity = relationshipRepository.save(entity);

        //set Relationship
//        UserDto recieverDto = new UserDto(receiver);
//        RelationshipDto relationshipDto = new RelationshipDto(entity);
//        recieverDto.setRelationshipDto(relationshipDto);

        //
        NotificationType notificationType = notificationTypeService.getNotificationTypeEntityByName("Friend");

        Notification notification = new Notification();
        notification.setCreateDate(new Date());
        notification.setContent(requestSender.getUsername() + " đã gửi lời mời kết bạn");
        notification.setOwner(receiver);
        notification.setActor(requestSender);
        notification.setNotificationType(notificationType);

        Notification savedNoti = notificationRepository.save(notification);
        NotificationDto willSendNoti = new NotificationDto(savedNoti);

        //send this noti via socket (do later)
        simpMessagingTemplate.convertAndSendToUser(receiver.getId().toString(), "/notification", willSendNoti);
        return new RelationshipDto(savedEntity);
    }

    @Override
    public RelationshipDto acceptFriendRequest(UUID relationshipId) {
        Relationship entity = relationshipRepository.findById(relationshipId).orElse(null);
        if (entity == null) return null;

        entity.setState(true);
        Relationship savedRelationship = relationshipRepository.save(entity);

        Room chatRoom = new Room();
        RoomType roomType = roomTypeRepository.findByName("private");
        chatRoom.setRoomType(roomType);
        chatRoom.setRelationship(entity);
        chatRoom.setCreateDate(new Date());

        //save room to db, now room is existed
        Room savedRoom = roomRepository.save(chatRoom);
        savedRelationship.setRoom(savedRoom);
        savedRelationship = relationshipRepository.save(savedRelationship);

        //add requestSender to room
        User requestSender = savedRelationship.getRequestSender();
        UserRoom userRoom1 = new UserRoom();
        userRoom1.setUser(requestSender);
        userRoom1.setRoom(savedRoom);
        userRoom1.setRole("user");

        userRoomRepository.save(userRoom1);

        //add receiver to room
        User receiver = savedRelationship.getReceiver();
        UserRoom userRoom2 = new UserRoom();
        userRoom2.setUser(receiver);
        userRoom2.setRoom(savedRoom);
        userRoom2.setRole("user");

        userRoomRepository.save(userRoom2);

        NotificationType notificationType = notificationTypeService.getNotificationTypeEntityByName("Friend");

        Notification notification = new Notification();
        notification.setCreateDate(new Date());
        notification.setActor(receiver);
        notification.setContent(receiver.getUsername() + " đã chấp nhận lời mời kết bạn");
        notification.setOwner(requestSender);
        notification.setNotificationType(notificationType);

        Notification savedNoti = notificationRepository.save(notification);
        NotificationDto willSendNoti = new NotificationDto(savedNoti);

        //send this noti via socket (do later)
        simpMessagingTemplate.convertAndSendToUser(requestSender.getId().toString(), "/notification", willSendNoti);

        //set Relationship
//        UserDto recieverDto = new UserDto(requestSender);
//        RelationshipDto relationshipDto = new RelationshipDto(entity);
//        recieverDto.setRelationshipDto(relationshipDto);


        //create very first messages for a room
        //common messageType is chat
        MessageType messageTypeNoti = messageTypeService.getMessageTypeEntityByName("notification");
        if (messageTypeNoti == null) return null;

        Message acFriendMessage = new Message();
        acFriendMessage.setSendDate(new Date());
        acFriendMessage.setContent(receiver.getUsername() + " đã chấp nhận lơi mời kết bạn");
        acFriendMessage.setMessageType(messageTypeNoti);
        acFriendMessage.setRoom(savedRoom);

        messageRepository.save(acFriendMessage);

//        //join messageType
//        MessageType joinMessageType = messageTypeService.getMessageTypeEntityByName("join");
//
//        Message senderJoinMessage = new Message();
//        senderJoinMessage.setSendDate(new Date());
//        senderJoinMessage.setContent(requestSender.getUsername() + " đã tham gia cuộc trò chuyện");
//        senderJoinMessage.setMessageType(joinMessageType);
//        senderJoinMessage.setRoom(savedRoom);
//
//        messageRepository.save(senderJoinMessage);
//
//        Message recieverJoinMessage = new Message();
//        recieverJoinMessage.setSendDate(new Date());
//        recieverJoinMessage.setContent(receiver.getUsername() + " đã tham gia cuộc trò chuyện");
//        recieverJoinMessage.setMessageType(joinMessageType);
//        recieverJoinMessage.setRoom(savedRoom);
//
//        messageRepository.save(recieverJoinMessage);


        return new RelationshipDto(savedRelationship);
    }

    @Override
    public Set<RelationshipDto> getPendingFriendRequests(SearchObject searchObject) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<Relationship> response = relationshipRepository.findAllPendingRelationship(currentUser.getId(), PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));
        Set<RelationshipDto> res = new HashSet<>();
        for (Relationship relationship : response) {
            RelationshipDto rela = new RelationshipDto(relationship);

            //set mutual friends of current user and viewing user
            rela.getRequestSender().setMutualFriends(getMutualFriends(rela.getRequestSender().getId(), currentUser.getId()));

            res.add(rela);
        }

        return res;
    }

    @Override
    public Set<RelationshipDto> getSentAddFriendRequests(SearchObject searchObject) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null || searchObject == null) return null;

        List<Relationship> response = relationshipRepository.findAllSentFriendRequestRelationship(currentUser.getId(), PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));
        Set<RelationshipDto> res = new HashSet<>();
        for (Relationship relationship : response) {
            RelationshipDto rela = new RelationshipDto(relationship);

            //set mutual friends of current user and viewing user
            rela.getReceiver().setMutualFriends(getMutualFriends(rela.getReceiver().getId(), currentUser.getId()));

            res.add(rela);
        }

        return res;
    }

    @Override
    public List<UserDto> getCurrentFriends(SearchObject searchObject) {

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<User> response = userRepository.findAllCurentFriend(currentUser.getId(), PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));
        List<UserDto> res = new ArrayList<>();
        for (User user : response) {
            UserDto person = new UserDto(user);

            //set mutual friends of current user and viewing user
            person.setMutualFriends(getMutualFriends(person.getId(), currentUser.getId()));

            if (searchObject.getKeyWord() != null && searchObject.getKeyWord().length() > 0) {
                if (containsKeyword(searchObject.getKeyWord(), user)) res.add(person);
            } else
                res.add(person);
        }
        return res;
    }

    @Override
    public List<UserDto> pagingNewUser(SearchObject searchObject) {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        String keyword = "";
        if (searchObject.getKeyWord() != null) keyword = searchObject.getKeyWord();
        List<User> response = userRepository.findNewUsers(keyword, currentUser.getId(), PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));

        List<UserDto> res = new ArrayList<>();
        for (User user : response) {
            UserDto person = new UserDto(user);

            //set mutual friends of current user and viewing user
            person.setMutualFriends(getMutualFriends(person.getId(), currentUser.getId()));

            res.add(person);
        }

        return res;
    }

    public boolean containsKeyword(String keyword, User user) {
        if (user.getAddress().contains(keyword)) return true;
        if (user.getUsername().contains(keyword)) return true;
        if (user.getEmail().contains(keyword)) return true;
        if (user.getFirstName().contains(keyword)) return true;
        if (user.getLastName().contains(keyword)) return true;
        return false;
    }

    @Override
    public List<UserDto> getFriendsOfUser(UUID userId, SearchObject searchObject) {
        User currentUser = userService.getUserEntityById(userId);
        if (currentUser == null) return null;

        List<User> response = userRepository.findAllCurentFriend(currentUser.getId(),
                PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));
        if (response == null) return null;
        List<UserDto> res = new ArrayList<>();
        for (User user : response) {
            UserDto person = new UserDto(user);

//            //set mutual friends of current user and viewing user
//            person.setMutualFriends(getMutualFriends(person.getId(), currentUser.getId()));

            if (searchObject.getKeyWord() != null && searchObject.getKeyWord().length() > 0) {
                if (containsKeyword(searchObject.getKeyWord(), user)) res.add(person);
            } else
                res.add(person);
        }

        return res;
    }

    @Override
    public List<UserDto> getMutualFriends(UUID userId1, UUID userId2) {
        User user1 = userRepository.findById(userId1).orElse(null);
        if (user1 == null) return null;
        User user2 = userRepository.findById(userId2).orElse(null);
        if (user2 == null) return null;
        if (user1.getId().equals(user2.getId())) return new ArrayList<>();

        SearchObject allFriendSO = new SearchObject();
        allFriendSO.setPageSize(10000);
        allFriendSO.setPageIndex(1);

        List<UserDto> mutualFriends = new ArrayList<>();

        Set<UUID> user1FriendIds = new HashSet<>();
        List<UserDto> user1Friends = getFriendsOfUser(user1.getId(), allFriendSO);
        if (user1Friends != null)
            for (UserDto user : user1Friends) {
                user1FriendIds.add(user.getId());
            }

        //get all mutual friend ids
        List<UserDto> user2Friends = getFriendsOfUser(user2.getId(), allFriendSO);
        if (user2Friends != null)
            for (UserDto user : user2Friends) {
                if (user1FriendIds.contains(user.getId())) {
                    mutualFriends.add(user);
                }
            }

        return mutualFriends;
    }

    @Modifying
    @Transactional
    @Override
    public RelationshipDto unFriend(UUID relationshipId) {
        Relationship entity = relationshipRepository.findById(relationshipId).orElse(null);
        if (entity == null) return null;
        //delete notification
        notificationRepository.deleteNotificationAddFriendByIdUser(entity.getReceiver().getId(), entity.getRequestSender().getId());
        notificationRepository.deleteNotificationAcceptFriendByIdUser(entity.getRequestSender().getId(), entity.getReceiver().getId());
        //delete message
        messageRepository.deleteMessageByRoomId(entity.getRoom().getId());
        //delete room user
        userRoomRepository.deleteUserRoomsByRoom(entity.getRoom());
        //delete relationship
        relationshipRepository.deleteById(relationshipId);
        //delete room
        roomRepository.deleteById(entity.getRoom().getId());
//        Room room = roomRepository.findById(entity.getRoom().getId()).orElse(null);
//        entity.setRoom(room);
//        relationshipRepository.save(entity);
        return null;
    }

    @Modifying
    @Transactional
    @Override
    public RelationshipDto unAcceptFriendRequest(UUID relationshipId) {
        Relationship entity = relationshipRepository.findById(relationshipId).orElse(null);
        if (entity == null) return null;
        if (entity.getRequestSender() == null) return null;
        //delete notification
        notificationRepository.deleteNotificationAddFriendByIdUser(entity.getReceiver().getId(), entity.getRequestSender().getId());
        //delete relationship
        relationshipRepository.deleteById(relationshipId);
//        Relationship relationship = relationshipRepository.findById(relationshipId).orElse(null);
//        RelationshipDto relationshipDto = null;
//        if(relationship == null){
//            return null;
//        }else{
//           relationshipDto = new RelationshipDto(relationship);
//        }

        return null;
    }


    @Override
    public List<UserDto> getAllFiends() {
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<User> allFriends = userRepository.getAllFriends(currentUser.getId());
        List<UserDto> friendList = new ArrayList<>();
        for (User friend : allFriends) {
            UserDto person = new UserDto(friend);

            //set mutual friends of current user and viewing user
            person.setMutualFriends(getMutualFriends(person.getId(), currentUser.getId()));

            friendList.add(person);
        }

        return friendList;
    }
}
