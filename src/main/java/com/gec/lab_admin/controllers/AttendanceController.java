package com.gec.lab_admin.controllers;

import com.gec.lab_admin.db.models.AttendanceRecord;
import com.gec.lab_admin.db.models.Teacher;
import com.gec.lab_admin.services.AttendanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AttendanceController {
    @Autowired
    AttendanceService attendanceService;

    final Logger logger = LoggerFactory.getLogger(AttendanceController.class);

    @RequestMapping(method = RequestMethod.POST,value = "/update/{subject_id}")
    public void update(@RequestBody AttendanceRecord attendanceRecord, @PathVariable s ){
        studentService.update(student,studentID);

    }


}
