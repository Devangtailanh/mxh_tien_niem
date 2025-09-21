package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.CommentDto;
import com.group4.HaUISocialMedia_server.dto.NotificationDto;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.CommentRepository;
import com.group4.HaUISocialMedia_server.repository.PostRepository;
import com.group4.HaUISocialMedia_server.service.CommentService;
import com.group4.HaUISocialMedia_server.service.NotificationService;
import com.group4.HaUISocialMedia_server.service.NotificationTypeService;
import com.group4.HaUISocialMedia_server.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final NotificationService notificationService;
    private final NotificationTypeService notificationTypeService;

    @Autowired
    public CommentServiceImpl(PostRepository postRepository,
                              CommentRepository commentRepository,
                              UserService userService,
                              NotificationService notificationService,
                              NotificationTypeService notificationTypeService) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.notificationService = notificationService;
        this.notificationTypeService = notificationTypeService;
    }

    // ---------- READ ----------

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Set<CommentDto> getParentCommentsOfPost(UUID postId) {
        if (postId == null || !postRepository.existsById(postId)) {
            return Collections.emptySet();
        }

        // Nếu có method findAllByPostId thì dùng cho rõ nghĩa/hiệu năng
        // List<Comment> comments = commentRepository.findAllByPostId(postId);
        List<Comment> comments = commentRepository.findAllByPost(postId);

        if (comments == null || comments.isEmpty()) {
            return Collections.emptySet();
        }

        return comments.stream()
                .map(CommentDto::new)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Set<CommentDto> getSubCommentOfComment(UUID commentId) {
        if (commentId == null) return Collections.emptySet();

        Comment parent = commentRepository.findById(commentId).orElse(null);
        if (parent == null) return Collections.emptySet();

        Set<Comment> subs = parent.getSubComments();
        if (subs == null || subs.isEmpty()) return Collections.emptySet();

        return subs.stream()
                .map(CommentDto::new)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public CommentDto getById(UUID commentId) {
        if (commentId == null) return null;
        return commentRepository.findById(commentId)
                .map(CommentDto::new)
                .orElse(null);
    }

    // ---------- WRITE ----------

    @Override
    @Transactional
    public CommentDto createComment(CommentDto dto) {
        if (dto == null || dto.getPost() == null || dto.getPost().getId() == null) {
            return null;
        }

        User actor = userService.getCurrentLoginUserEntity();
        if (actor == null) return null;

        Post post = postRepository.findById(dto.getPost().getId()).orElse(null);
        if (post == null) return null;

        Comment entity = new Comment();
        entity.setContent(dto.getContent());
        entity.setCreateDate(new Date());
        entity.setOwner(actor);
        entity.setPost(post);

        // Nếu là reply
        if (dto.getRepliedComment() != null && dto.getRepliedComment().getId() != null) {
            Comment parent = commentRepository.findById(dto.getRepliedComment().getId()).orElse(null);
            if (parent != null) {
                entity.setRepliedComment(parent);

                // Thông báo cho chủ sở hữu comment cha, trừ khi tự trả lời mình
                User receiver = parent.getOwner();
                if (receiver != null && !Objects.equals(receiver.getId(), actor.getId())) {
                    NotificationType type = notificationTypeService.getNotificationTypeEntityByName("Post");
                    Notification replyNoti = new Notification();
                    replyNoti.setCreateDate(new Date());
                    replyNoti.setContent(actor.getUsername() + " đã trả lời bình luận của bạn trong một bài viết");
                    replyNoti.setPost(post);
                    replyNoti.setOwner(receiver);
                    replyNoti.setActor(actor);
                    replyNoti.setNotificationType(type);
                    notificationService.save(new NotificationDto(replyNoti));
                }
            }
        }

        Comment saved = commentRepository.save(entity);

        // Thông báo cho chủ bài viết nếu người bình luận không phải là chủ bài viết
        User postOwner = post.getOwner();
        if (postOwner != null && !Objects.equals(postOwner.getId(), actor.getId())) {
            NotificationType type = notificationTypeService.getNotificationTypeEntityByName("Post");
            Notification postNoti = new Notification();
            postNoti.setCreateDate(new Date());
            postNoti.setContent(actor.getUsername() + " đã bình luận một bài đăng của bạn");
            postNoti.setPost(post);
            postNoti.setOwner(postOwner);
            postNoti.setActor(actor);
            postNoti.setNotificationType(type);
            notificationService.save(new NotificationDto(postNoti));
        }

        return new CommentDto(saved);
    }

    @Override
    @Transactional
    public CommentDto updateComment(CommentDto dto) {
        if (dto == null || dto.getId() == null) return null;

        Comment entity = commentRepository.findById(dto.getId()).orElse(null);
        if (entity == null) return null;

        // Chỉ nên cập nhật nội dung; KHÔNG nên set lại createDate
        entity.setContent(dto.getContent());
        // Nếu có trường updatedAt thì nên dùng:
        // entity.setUpdateDate(new Date());

        return new CommentDto(commentRepository.saveAndFlush(entity));
    }

    @Override
    @Transactional
    public CommentDto deleteComment(UUID commentId) {
        if (commentId == null) return null;

        Comment entity = commentRepository.findById(commentId).orElse(null);
        if (entity == null) return null;

        // Xoá con trước để tránh FK constraint
        commentRepository.deleteAllByRepliedComment(entity.getId());
        commentRepository.delete(entity);

        return new CommentDto(entity);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean hasAuthorityToChange(UUID commentId) {
        if (commentId == null) return false;

        Comment entity = commentRepository.findById(commentId).orElse(null);
        if (entity == null) return false;

        User currentUser = userService.getCurrentLoginUserEntity();
        if (currentUser == null) return false;

        return Objects.equals(currentUser.getId(), entity.getOwner().getId());
    }

    @Override
    @Transactional
    public void deleteAllByIdPost(UUID idPost) {
        if (idPost == null) return;
        // GỢI Ý: khai báo trong CommentRepository:
        // void deleteAllByPostId(UUID postId);
        // Ở đây gọi đúng API xoá theo post:
        commentRepository.deleteAllByPostId(idPost);
    }
}
