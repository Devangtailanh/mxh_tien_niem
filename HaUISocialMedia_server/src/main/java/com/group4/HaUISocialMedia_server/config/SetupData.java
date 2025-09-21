package com.group4.HaUISocialMedia_server.config;

import com.group4.HaUISocialMedia_server.dto.CourseResultDto;
import com.group4.HaUISocialMedia_server.dto.MessageTypeDto;
import com.group4.HaUISocialMedia_server.dto.NotificationTypeDto;
import com.group4.HaUISocialMedia_server.dto.RoomTypeDto;
import com.group4.HaUISocialMedia_server.entity.*;
import com.group4.HaUISocialMedia_server.repository.*;
import com.group4.HaUISocialMedia_server.service.CourseResultService;
import com.group4.HaUISocialMedia_server.service.MessageTypeService;
import com.group4.HaUISocialMedia_server.service.NotificationTypeService;
import com.group4.HaUISocialMedia_server.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SetupData implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        setupData();

        System.out.println("Application started with hoangcuong's initial config!");
    }

    private void setupData() {
        initializeBaseUser();
        initializeRoomType();
        initializeMessageType();
        initializeNotificationType();
        initializeCourseResult();
        initializeCourse();
        initializeClassroom();
    }

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private void initializeBaseUser() {
        //initialize user admin
        User admin = userRepository.findByUsername("admin");
        if (admin == null) {
            admin = new User();
            admin.setRole(Role.ADMIN.name());
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));

            userRepository.save(admin);
        }
//        List<User> users = userRepository.findAllByRole("USER");
//        for(User user:users){
//            user.setDisable(false);
//            userRepository.save(user);
//        }
    }

    @Autowired
    private RoomTypeService roomTypeService;

    private void initializeRoomType() {
        RoomType privates = roomTypeService.getRoomTypeEntityByName("private");
        if (privates == null) {
            RoomTypeDto dto = new RoomTypeDto();
            dto.setCode("001");
            dto.setName("private");
            dto.setDescription("private room is for 2 people chatting");
            roomTypeService.createRoomType(dto);
        }

        RoomType pub = roomTypeService.getRoomTypeEntityByName("public");
        if (pub == null) {
            RoomTypeDto dto = new RoomTypeDto();
            dto.setCode("002");
            dto.setName("public");
            dto.setDescription("public room is for multiple people chatting");
            roomTypeService.createRoomType(dto);
        }

        RoomType group = roomTypeService.getRoomTypeEntityByName("group");
        if (group == null) {
            RoomTypeDto dto = new RoomTypeDto();
            dto.setCode("003");
            dto.setName("group");
            dto.setDescription("is private room chat for at least 3 people");
            roomTypeService.createRoomType(dto);
        }
    }


    @Autowired
    private CourseResultRepository courseResultRepository;

    private void initializeCourseResult() {
        CourseResult test = courseResultRepository.findByName("Xuất sắc");
        if (test == null) {
            CourseResult A = new CourseResult();
            A.setCode("A");
            A.setName("Xuất sắc");
            A.setDescription("Học sinh đạt thành tích xuất sắc");
            courseResultRepository.save(A);
        }

        CourseResult test1 = courseResultRepository.findByName("Giỏi");
        if (test1 == null) {
            CourseResult B_plus = new CourseResult();
            B_plus.setCode("B+");
            B_plus.setName("Giỏi");
            B_plus.setDescription("Học sinh đạt thành tích giỏi");
            courseResultRepository.save(B_plus);
        }

        CourseResult test3 = courseResultRepository.findByName("Khá giỏi");
        if (test3 == null) {
            CourseResult B = new CourseResult();
            B.setCode("B");
            B.setName("Khá giỏi");
            B.setDescription("Học sinh đạt thành tích khá giỏi");
            courseResultRepository.save(B);
        }

        CourseResult test4 = courseResultRepository.findByName("Khá");
        if (test4 == null) {
            CourseResult C_plus = new CourseResult();
            C_plus.setCode("C+");
            C_plus.setName("Khá");
            C_plus.setDescription("Học sinh đạt thành tích khá");
            courseResultRepository.save(C_plus);
        }

        CourseResult test5 = courseResultRepository.findByName("Trung bình khá");
        if (test5 == null) {
            CourseResult C = new CourseResult();
            C.setCode("C");
            C.setName("Trung bình khá");
            C.setDescription("Học sinh đạt thành tích trung bình khá");
            courseResultRepository.save(C);
        }

        CourseResult test6 = courseResultRepository.findByName("Trung bình");
        if (test6 == null) {
            CourseResult D_plus = new CourseResult();
            D_plus.setCode("D+");
            D_plus.setName("Trung bình");
            D_plus.setDescription("Học sinh đạt thành tích trung bình");
            courseResultRepository.save(D_plus);
        }

        CourseResult test7 = courseResultRepository.findByName("Trung bình kém");
        if (test7 == null) {
            CourseResult D = new CourseResult();
            D.setCode("D");
            D.setName("Trung bình kém");
            D.setDescription("Học sinh đạt thành tích trung bình kém");
            courseResultRepository.save(D);
        }

        CourseResult test8 = courseResultRepository.findByName("Kém");
        if (test8 == null) {
            CourseResult F = new CourseResult();
            F.setCode("F");
            F.setName("Kém");
            F.setDescription("Học sinh đạt thành tích kém");
            courseResultRepository.save(F);
        }

    }

    @Autowired
    private ClassroomRepository classroomRepository;

    private void initializeClassroom(){
        Classroom test = classroomRepository.findByName("KTPM04");
        if(test == null){
            Classroom A = new Classroom();
            A.setCode("001");
            A.setName("KTPM04");
            A.setDescription("Ngành kĩ thuật phần mềm");
            classroomRepository.save(A);
        }

        Classroom test1 = classroomRepository.findByName("KTPM03");
        if(test1 == null){
            Classroom B = new Classroom();
            B.setCode("002");
            B.setName("KTPM03");
            B.setDescription("Ngành kĩ thuật phần mềm");
            classroomRepository.save(B);
        }

        Classroom test2 = classroomRepository.findByName("KTPM02");
        if(test2 == null){
            Classroom C = new Classroom();
            C.setCode("003");
            C.setName("KTPM02");
            C.setDescription("Ngành kĩ thuật phần mềm");
            classroomRepository.save(C);
        }

        Classroom test3 = classroomRepository.findByName("KTPM01");
        if(test3 == null){
            Classroom D = new Classroom();
            D.setCode("004");
            D.setName("KTPM01");
            D.setDescription("Ngành kĩ thuật phần mềm");
            classroomRepository.save(D);
        }

        Classroom test4 = classroomRepository.findByName("HTTT01");
        if(test4 == null){
            Classroom E = new Classroom();
            E.setCode("005");
            E.setName("HTTT)1");
            E.setDescription("Ngành hệ thống thông tin");
            classroomRepository.save(E);
        }

        Classroom test5 = classroomRepository.findByName("HTTT02");
        if(test5 == null){
            Classroom F = new Classroom();
            F.setCode("006");
            F.setName("HTTT02");
            F.setDescription("Ngành hệ thống thông tin");
            classroomRepository.save(F);
        }

        Classroom test6 = classroomRepository.findByName("HTTT03");
        if(test6 == null){
            Classroom G = new Classroom();
            G.setCode("007");
            G.setName("HTTT03");
            G.setDescription("Ngành hệ thống thông tin");
            classroomRepository.save(G);
        }

        Classroom test7 = classroomRepository.findByName("HTTT04");
        if(test7 == null){
            Classroom H = new Classroom();
            H.setCode("008");
            H.setName("HTTT04");
            H.setDescription("Ngành hệ thống thông tin");
            classroomRepository.save(H);
        }

        Classroom test8 = classroomRepository.findByName("CNTT01");
        if(test8 == null){
            Classroom I = new Classroom();
            I.setCode("009");
            I.setName("CNTT01");
            I.setDescription("Ngành công nghệ thôn tin");
            classroomRepository.save(I);
        }

        Classroom test9 = classroomRepository.findByName("CNTT02");
        if(test9 == null){
            Classroom J = new Classroom();
            J.setCode("010");
            J.setName("CNTT02");
            J.setDescription("Ngành công nghệ thôn tin");
            classroomRepository.save(J);
        }

        Classroom test10 = classroomRepository.findByName("CNTT03");
        if(test10 == null){
            Classroom K = new Classroom();
            K.setCode("011");
            K.setName("CNTT03");
            K.setDescription("Ngành công nghệ thôn tin");
            classroomRepository.save(K);
        }

        Classroom test11 = classroomRepository.findByName("CNTT04");
        if(test11 == null){
            Classroom L = new Classroom();
            L.setCode("012");
            L.setName("CNTT04");
            L.setDescription("Ngành công nghệ thôn tin");
            classroomRepository.save(L);
        }

        Classroom test12 = classroomRepository.findByName("KHMT01");
        if(test12 == null){
            Classroom N = new Classroom();
            N.setCode("013");
            N.setName("KHMT01");
            N.setDescription("Ngành khoa học máy tính");
            classroomRepository.save(N);
        }

        Classroom test13 = classroomRepository.findByName("KHMT02");
        if(test13 == null){
            Classroom O = new Classroom();
            O.setCode("014");
            O.setName("KHMT02");
            O.setDescription("Ngành khoa học máy tính");
            classroomRepository.save(O);
        }

        Classroom test14 = classroomRepository.findByName("KHMT03");
        if(test14 == null){
            Classroom Q = new Classroom();
            Q.setCode("015");
            Q.setName("KHMT03");
            Q.setDescription("Ngành khoa học máy tính");
            classroomRepository.save(Q);
        }

        Classroom test15 = classroomRepository.findByName("KHMT04");
        if(test15 == null){
            Classroom M = new Classroom();
            M.setCode("016");
            M.setName("KHMT04");
            M.setDescription("Ngành khoa học máy tính");
            classroomRepository.save(M);
        }

        Classroom test16 = classroomRepository.findByName("QTKD01");
        if(test16 == null){
            Classroom V = new Classroom();
            V.setCode("017");
            V.setName("QTKD01");
            V.setDescription("Ngành quản trị kinh doanh");
            classroomRepository.save(V);
        }

        Classroom test17 = classroomRepository.findByName("QTKD02");
        if(test17 == null){
            Classroom X = new Classroom();
            X.setCode("018");
            X.setName("QTKD02");
            X.setDescription("Ngành quản trị kinh doanh");
            classroomRepository.save(X);
        }

        Classroom test18 = classroomRepository.findByName("QTKD03");
        if(test18 == null){
            Classroom W = new Classroom();
            W.setCode("019");
            W.setName("QTKD03");
            W.setDescription("Ngành quản trị kinh doanh");
            classroomRepository.save(W);
        }

        Classroom test19 = classroomRepository.findByName("QTKD04");
        if(test19 == null){
            Classroom Y = new Classroom();
            Y.setCode("020");
            Y.setName("QTKD04");
            Y.setDescription("Ngành quản trị kinh doanh");
            classroomRepository.save(Y);
        }

    }


    @Autowired
    private CourseRepository courseRepository;

    private void initializeCourse() {
        Course test = courseRepository.findByName("Giải tích");
        if (test == null) {
            Course A = new Course();
            A.setCode("001");
            A.setName("Giải tích");
            A.setDescription("Môn học tính toán cơ bản");
            courseRepository.save(A);
        }

        Course test1 = courseRepository.findByName("Đại số tuyến tính");
        if (test1 == null) {
            Course A = new Course();
            A.setCode("002");
            A.setName("Đại số tuyến tính");
            A.setDescription("Môn học tính toán trung binh");
            courseRepository.save(A);
        }

        Course test2 = courseRepository.findByName("Kỹ thuật lập trình");
        if (test2 == null) {
            Course A = new Course();
            A.setCode("003");
            A.setName("Kỹ thuật lập trình");
            A.setDescription("Môn lập trình cơ bản");
            courseRepository.save(A);
        }

        Course test3 = courseRepository.findByName("Lập trình hướng đối tượng");
        if (test3 == null) {
            Course A = new Course();
            A.setCode("004");
            A.setName("Lập trình hướng đối tượng");
            A.setDescription("Môn lập trình hướng đối tượng");
            courseRepository.save(A);
        }

        Course test4 = courseRepository.findByName("Java nâng cao");
        if (test4 == null) {
            Course A = new Course();
            A.setCode("005");
            A.setName("Java nâng cao");
            A.setDescription("Môn học của java mạng socket");
            courseRepository.save(A);
        }

        Course test5 = courseRepository.findByName("Lập trình java");
        if (test5 == null) {
            Course A = new Course();
            A.setCode("006");
            A.setName("Lập trình java");
            A.setDescription("Môn học java cơ bản");
            courseRepository.save(A);
        }

        Course test6 = courseRepository.findByName("Triết học");
        if (test6 == null) {
            Course A = new Course();
            A.setCode("007");
            A.setName("Triết học");
            A.setDescription("Môn học liên quan đến đời sống xã hội");
            courseRepository.save(A);
        }

        Course test7 = courseRepository.findByName("Lịch sử đảng");
        if (test7 == null) {
            Course A = new Course();
            A.setCode("008");
            A.setName("Lịch sử đảng");
            A.setDescription("Môn học liên quan đến lịch sử đất nước");
            courseRepository.save(A);
        }

        Course test8 = courseRepository.findByName("Pháp luật đại cương");
        if (test8 == null) {
            Course A = new Course();
            A.setCode("009");
            A.setName("Pháp luật đại cương");
            A.setDescription("Môn liên quan đến pháp luật cơ bản");
            courseRepository.save(A);
        }

        Course test9 = courseRepository.findByName("Lập trình C++");
        if (test9 == null) {
            Course A = new Course();
            A.setCode("010");
            A.setName("Lập trình C++");
            A.setDescription("Môn lập trình C++ cơ bản");
            courseRepository.save(A);
        }

        Course test10 = courseRepository.findByName("Lập trình .Net");
        if (test10 == null) {
            Course A = new Course();
            A.setCode("011");
            A.setName("Lập trình .Net");
            A.setDescription("Môn học của C# cơ bản");
            courseRepository.save(A);
        }

        Course test11 = courseRepository.findByName("ASP.Net");
        if (test11 == null) {
            Course A = new Course();
            A.setCode("012");
            A.setName("ASP.Net");
            A.setDescription("Môn học liên quan đến C# nâng cao");
            courseRepository.save(A);
        }

        Course test12 = courseRepository.findByName("Lập trình game");
        if (test12 == null) {
            Course A = new Course();
            A.setCode("013");
            A.setName("Lập trình game");
            A.setDescription("Môn lập trình game cơ bản");
            courseRepository.save(A);
        }

        Course test13 = courseRepository.findByName("Thiết kế giao diện người dùng");
        if (test13 == null) {
            Course A = new Course();
            A.setCode("014");
            A.setName("Thiết kế giao diện người dùng");
            A.setDescription("Môn thiết kế cơ bản về giao diện");
            courseRepository.save(A);
        }

        Course test14 = courseRepository.findByName("Đồ họa máy tính");
        if (test14 == null) {
            Course A = new Course();
            A.setCode("015");
            A.setName("Đồ họa máy tính");
            A.setDescription("Môn học về đồ họa máy tính");
            courseRepository.save(A);
        }

        Course test15 = courseRepository.findByName("Kiến trúc máy tính");
        if (test15 == null) {
            Course A = new Course();
            A.setCode("016");
            A.setName("Kiến trúc máy tính");
            A.setDescription("Môn học về kiến trúc máy tính");
            courseRepository.save(A);
        }

        Course test16 = courseRepository.findByName("An toàn bảo mật thông tin");
        if (test16 == null) {
            Course A = new Course();
            A.setCode("017");
            A.setName("An toàn bảo mật thông tin");
            A.setDescription("Môn học về an toàn bảo mật thông tin");
            courseRepository.save(A);
        }

        Course test17 = courseRepository.findByName("Thiết kế web");
        if (test17 == null) {
            Course A = new Course();
            A.setCode("018");
            A.setName("Thiết kế web");
            A.setDescription("Môn học về thiết kế web");
            courseRepository.save(A);
        }

        Course test18 = courseRepository.findByName("Kiểm thử phần mềm");
        if (test18 == null) {
            Course A = new Course();
            A.setCode("019");
            A.setName("Kiểm thử phần mềm");
            A.setDescription("Môn học về kiểm thử phần mềm");
            courseRepository.save(A);
        }

        Course test19 = courseRepository.findByName("Thực tập chuyên ngành");
        if (test19 == null) {
            Course A = new Course();
            A.setCode("020");
            A.setName("Thực tập chuyên ngành");
            A.setDescription("Môn học thực tập chuyên ngành");
            courseRepository.save(A);
        }
    }


    @Autowired
    private MessageTypeService messageTypeService;

    private void initializeMessageType() {
        MessageType joined = messageTypeService.getMessageTypeEntityByName("join");
        if (joined == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("001");
            dto.setName("join");
            dto.setDescription("new user joined conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType left = messageTypeService.getMessageTypeEntityByName("left");
        if (left == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("002");
            dto.setName("left");
            dto.setDescription("an user had left the conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType chat = messageTypeService.getMessageTypeEntityByName("chat");
        if (chat == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("003");
            dto.setName("chat");
            dto.setDescription("a common message in the conversation");
            messageTypeService.createMessageType(dto);
        }

        MessageType notification = messageTypeService.getMessageTypeEntityByName("notification");
        if (notification == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("004");
            dto.setName("notification");
            dto.setDescription("is a notification");
            messageTypeService.createMessageType(dto);
        }

        MessageType recall = messageTypeService.getMessageTypeEntityByName("recall");
        if (recall == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("006");
            dto.setName("recall");
            dto.setDescription("a message which is recalled by creator");
            messageTypeService.createMessageType(dto);
        }

        MessageType sticker = messageTypeService.getMessageTypeEntityByName("sticker");
        if (sticker == null) {
            MessageTypeDto dto = new MessageTypeDto();
            dto.setCode("007");
            dto.setName("sticker");
            dto.setDescription("sticker in conversation");
            messageTypeService.createMessageType(dto);
        }
    }

    @Autowired
    private NotificationTypeService notificationTypeService;

    private void initializeNotificationType() {
//        NotificationType tym1 = notificationTypeService.getNotificationTypeEntityByName("Liked");
//        if (tym1 == null) {
//            NotificationTypeDto tym = new NotificationTypeDto();
//            tym.setCode("001");
//            tym.setName("Liked");
//            tym.setDescription("a person liked your post");
//            notificationTypeService.save(tym);
//        }
//
//        NotificationType accept1 = notificationTypeService.getNotificationTypeEntityByName("Accepted");
//        if (accept1 == null) {
//            NotificationTypeDto accept = new NotificationTypeDto();
//            accept.setCode("002");
//            accept.setName("Accepted");
//            accept.setDescription("a person accepted your request friend");
//            notificationTypeService.save(accept);
//        }
//
//        NotificationType request1 = notificationTypeService.getNotificationTypeEntityByName("Requested");
//        if (request1 == null) {
//            NotificationTypeDto request = new NotificationTypeDto();
//            request.setCode("003");
//            request.setName("Requested");
//            request.setDescription("a person requested add friend with you");
//            notificationTypeService.save(request);
//        }

        NotificationType post = notificationTypeService.getNotificationTypeEntityByName("Post");
        if (post == null) {
            NotificationTypeDto postDto = new NotificationTypeDto();
            postDto.setCode("001");
            postDto.setName("Post");
            postDto.setDescription("Tym, Comment, Reply Comment");
            notificationTypeService.save(postDto);
        }

        NotificationType friend = notificationTypeService.getNotificationTypeEntityByName("Friend");
        if (friend == null) {
            NotificationTypeDto friendDto = new NotificationTypeDto();
            friendDto.setCode("002");
            friendDto.setName("Friend");
            friendDto.setDescription("add friend, accept friend");
            notificationTypeService.save(friendDto);
        }

        NotificationType group = notificationTypeService.getNotificationTypeEntityByName("Group");
        if (group == null) {
            NotificationTypeDto groupDto = new NotificationTypeDto();
            groupDto.setCode("003");
            groupDto.setName("Group");
            groupDto.setDescription("approve request, update background group");
            notificationTypeService.save(groupDto);
        }

        NotificationType chat = notificationTypeService.getNotificationTypeEntityByName("Chat");
        if (chat == null) {
            NotificationTypeDto chatDto = new NotificationTypeDto();
            chatDto.setCode("004");
            chatDto.setName("Chat");
            chatDto.setDescription("alert when a message is sent to a conversation that user joined in");
            notificationTypeService.save(chatDto);
        }
    }


}