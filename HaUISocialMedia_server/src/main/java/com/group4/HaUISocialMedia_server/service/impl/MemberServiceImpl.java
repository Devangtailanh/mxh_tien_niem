package com.group4.HaUISocialMedia_server.service.impl;

import com.group4.HaUISocialMedia_server.dto.MemberDto;
import com.group4.HaUISocialMedia_server.entity.Member;
import com.group4.HaUISocialMedia_server.repository.GroupRepository;
import com.group4.HaUISocialMedia_server.repository.MemberRepository;
import com.group4.HaUISocialMedia_server.repository.UserRepository;
import com.group4.HaUISocialMedia_server.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public MemberDto createUserGroup(MemberDto memberDto) {
        if(memberDto == null)
            return null;
        Member newGroupUser = new Member();
       newGroupUser.setJoinDate(memberDto.getJoinDate());
        newGroupUser.setApproved(memberDto.isApproved());
        newGroupUser.setRole(memberDto.getRole());
        if(memberDto.getUser() != null)
            newGroupUser.setUser(userRepository.findById(memberDto.getUser().getId()).orElse(null));
        if(memberDto.getGroup() != null)
            newGroupUser.setGroup(groupRepository.findById(memberDto.getGroup().getId()).orElse(null));

        return new MemberDto(memberRepository.save(newGroupUser));
    }

    @Override
    public MemberDto updateUserGroup(MemberDto memberDto) {
        Member oldMember = memberRepository.findById(memberDto.getId()).orElse(null);
        if(oldMember == null)
            return null;
       // oldMember.setJoinDate(new Date());
        oldMember.setApproved(true);
        oldMember.setRole(memberDto.getRole());

        return new MemberDto(memberRepository.saveAndFlush(oldMember));
    }

    @Override
    public boolean deleteUserGroup(UUID memberId) {
        Member oldMember = memberRepository.findById(memberId).orElse(null);
        if(oldMember == null)
            return false;
        memberRepository.deleteById(memberId);
        return true;
    }
}
