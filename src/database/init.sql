SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for checkin
-- ----------------------------
DROP TABLE IF EXISTS `checkin`;
CREATE TABLE `checkin` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wx_id` varchar(50) NOT NULL,
  `patient_id` int NOT NULL,
  `date` datetime,
  `lesson_id` int NOT NULL,
  `training_time` int  DEFAULT 0,
  `created_at` timestamp  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp  DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for diease
-- ----------------------------
DROP TABLE IF EXISTS `diease`;
CREATE TABLE `diease` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `paient_id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `info` varchar(100) NOT NULL,
  `stage` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- ----------------------------
-- Table structure for doctor
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wx_id` varchar(50) NOT NULL,
  `super` boolean  NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL,
  `job_number` int  NULL DEFAULT NULL,
  `contact` varchar(50) NOT NULL,
  `review` boolean NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for lesson
-- ----------------------------
DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `video_url` varchar(255) NOT NULL,
  `title` varchar(50)  NULL DEFAULT NULL,
  `info` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wx_id` varchar(50) NOT NULL,
  `gender` tinyint NOT NULL,
  `name` varchar(50)  NULL DEFAULT NULL,
  `contact` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `doctor_id` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `account_register` boolean NOT NULL,
  `info_edit` boolean NOT NULL,
  `info_search` boolean NOT NULL,
  `video_upload` boolean NOT NULL,
  `video_edit` boolean NOT NULL,
  `lesson_add` boolean NOT NULL,
  `lesson_info` boolean NOT NULL,
  `check_paitient_diease` boolean NOT NULL,
  `check_paitient_info` boolean NOT NULL,
  `check_paitient_privacy` boolean NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
