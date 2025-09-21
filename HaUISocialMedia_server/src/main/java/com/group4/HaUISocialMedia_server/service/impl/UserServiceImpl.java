package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.PostDto;
import com.group4.HaUISocialMedia_server.dto.RelationshipDto;
import com.group4.HaUISocialMedia_server.dto.SearchObject;
import com.group4.HaUISocialMedia_server.dto.UserDto;
import com.group4.HaUISocialMedia_server.entity.Post;
import com.group4.HaUISocialMedia_server.entity.Relationship;
import com.group4.HaUISocialMedia_server.entity.User;
import com.group4.HaUISocialMedia_server.repository.ClassroomRepository;
import com.group4.HaUISocialMedia_server.repository.PostImageRepository;
import com.group4.HaUISocialMedia_server.repository.RelationshipRepository;
import com.group4.HaUISocialMedia_server.repository.UserRepository;
import com.group4.HaUISocialMedia_server.service.PostService;
import com.group4.HaUISocialMedia_server.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RelationshipServiceImpl relationshipService;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RelationshipRepository relationshipRepository;

    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private PostService postService;

    @Override
    public List<UserDto> getAllUsers() {
        User currentUser = this.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<UserDto> res = new ArrayList<>();
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            UserDto person = new UserDto(user);

            //set mutual friends of current user and viewing user
            person.setMutualFriends(relationshipService.getMutualFriends(person.getId(), currentUser.getId()));

            res.add(person);
        }

        return res;
    }

    @Override
    public UserDto getById(UUID userId) {
        if (userId == null) return null;
        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;

        UserDto res = new UserDto(user);

        if (!currentUser.getId().equals(userId)) {
            List<Relationship> relationships = relationshipRepository.getRelationshipBetweenCurrentUserAndViewingUser(currentUser.getId(), userId);

            Relationship relationship = null;
            if (relationships != null && relationships.size() > 0) {
                relationship = relationships.get(0);

                if (relationships.size() >= 2)
                    System.out.println("There's duplicate record which is must be have 1 in database, error but handled");
            }

            if (relationship != null) {
                RelationshipDto relationshipDto = new RelationshipDto(relationship);
                res.setRelationshipDto(relationshipDto);
            }
        }

        //set mutual friends of current user and viewing user
        res.setMutualFriends(relationshipService.getMutualFriends(res.getId(), currentUser.getId()));

        return res;
    }

    @Override
    public UserDto getByUserName(String name) {
        if (name == null) return null;
        UserDto res = new UserDto(userRepository.findByUsername(name));
        if (res == null) return null;

        User currentUser = this.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        //set mutual friends of current user and viewing user
        res.setMutualFriends(relationshipService.getMutualFriends(currentUser.getId(), res.getId()));

        return res;
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        userRepository.deleteById(id);
    }


    @Override
    @Transactional
    public UserDto updateUser(UserDto dto) {
        User entity = userService.getCurrentLoginUserEntity();
        if (entity == null)
            return null;

        //auto create background post
        if (dto.getBackground() != null) {
            if (!dto.getBackground().equals(entity.getBackground()))
                postService.updateBackgroundImage(dto.getBackground());
        }
        //auto create avatar post
        if (dto.getAvatar() != null) {
            if (!dto.getAvatar().equals(entity.getAvatar()))
                postService.updateProfileImage(dto.getAvatar());
        }

        entity.setCode(dto.getCode());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setUsername(dto.getUsername());
        entity.setAddress(dto.getAddress());
        entity.setGender(dto.isGender());
        entity.setBirthDate(dto.getBirthDate());
        entity.setAvatar(dto.getAvatar());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setBackground(dto.getBackground());

        if (dto.getClassroomDto() != null)
            entity.setClassroom(classroomRepository.findById(dto.getClassroomDto().getId()).orElse(null));

        userRepository.saveAndFlush(entity);

        return dto;
    }

    @Override
    public List<UserDto> searchByUsername(SearchObject searchObject) {
        if (searchObject == null) return null;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        List<UserDto> res = new ArrayList<>();
        List<User> validUsers = userRepository.getByUserName(searchObject.getKeyWord(), searchObject.getPageSize(), searchObject.getPageIndex() - 1);
        for (User user : validUsers) {
            UserDto person = new UserDto(user);
            //set mutual friends of current user and viewing user
            person.setMutualFriends(relationshipService.getMutualFriends(person.getId(), currentUser.getId()));
        }
        return res;
    }

    @Override
    public List<UserDto> pagingUser(SearchObject searchObject) {
        return pagingByKeyword(searchObject);
    }

    @Override
    public User getCurrentLoginUserEntity() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String currentUserName = auth.getName();
        if (currentUserName == null) return null;
        User currentUser = userRepository.findByUsername(currentUserName);

        return currentUser;
    }

    @Override
    public User getUserEntityById(UUID userId) {
        return userRepository.findById(userId).orElse(null);
    }


    @Override
    public UserDto getCurrentLoginUser() {
        User currentUser = this.getCurrentLoginUserEntity();
        if (currentUser == null) return null;

        return new UserDto(currentUser);
    }

    @Override
    public UserDto isDisable(UUID userId) {
        User currentUser = this.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        if (!currentUser.getRole().equals("ADMIN")) return null;
        User entity = userRepository.findById(userId).orElse(null);
        entity.setDisable(true);
        userRepository.save(entity);
        return new UserDto(entity);
    }

    @Override
    public UserDto updateStatus(UUID userId) {
        User currentUser = this.getCurrentLoginUserEntity();
        if (currentUser == null) return null;
        if (!currentUser.getRole().equals("ADMIN")) return null;
        User entity = userRepository.findById(userId).orElse(null);
        entity.setDisable(false);
        userRepository.save(entity);
        return new UserDto(entity);
    }

    @Override
    public List<UserDto> pagingByKeyword(SearchObject searchObject) {
        if (searchObject == null) return null;
        String keyword = insertPercent(searchObject.getKeyWord());

        User currentUser = userService.getCurrentLoginUserEntity();

        if (currentUser == null || searchObject == null) return null;

        List<User> validUsers = userRepository.pagingUsers(keyword,
                PageRequest.of(searchObject.getPageIndex() - 1, searchObject.getPageSize()));

        List<UserDto> res = new ArrayList<>();
        for (User user : validUsers) {
            UserDto person = new UserDto(user);

            //set relationship between current user and viewing user
            if (!currentUser.getId().equals(person.getId())) {
                List<Relationship> relationships = relationshipRepository.getRelationshipBetweenCurrentUserAndViewingUser(currentUser.getId(), person.getId());

                Relationship relationship = null;
                if (relationships != null && relationships.size() > 0) {
                    relationship = relationships.get(0);

                    if (relationships.size() >= 2)
                        System.out.println("There's duplicate record which is must be have 1 in database, error but handled");
                }


                if (relationship != null) {
                    RelationshipDto relationshipDto = new RelationshipDto(relationship);
                    person.setRelationshipDto(relationshipDto);
                }
            }

            //set mutual friends of current user and viewing user
            person.setMutualFriends(relationshipService.getMutualFriends(person.getId(), currentUser.getId()));

            res.add(person);
        }

        return res;
    }

    public String insertPercent(String word) {
        if (word == null || word.length() == 0) return "";
        StringBuilder result = new StringBuilder();

        result.append('%');

        for (int i = 0; i < word.length(); i++) {
            result.append(word.charAt(i));
            result.append('%');
        }

        return result.toString();
    }
}
