SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for checkin
-- ----------------------------
DROP TABLE IF EXISTS `clockin`;
CREATE TABLE `clockin` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `date` timestamp,
  `lesson_id` int NOT NULL,
  `training_time` int  DEFAULT 0,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for diease
-- ----------------------------
DROP TABLE IF EXISTS `disease`;
CREATE TABLE `disease` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `doctor_id` int NULL DEFAULT NULL,
  `patient_id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `info` varchar(100) NOT NULL,
  `stage` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `job_number` varchar(50)  NULL DEFAULT NULL,
  `contact` varchar(50)  NULL DEFAULT NULL,
  `review` boolean NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for lesson
-- ----------------------------
DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `video_length` int unsigned NOT NULL DEFAULT 0,
  `video_url` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `category` varchar(50),
  `title` varchar(50)  NOT NULL,
  `info` text NOT NULL,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `wx_id` varchar(50) NOT NULL,
  `gender` tinyint NULL DEFAULT NULL,
  `name` varchar(50)  NULL DEFAULT NULL,
  `contact` varchar(255) NULL DEFAULT NULL,
  `address` varchar(255) NULL DEFAULT NULL,
  `age` int NOT NULL,
  `doctor_id` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for disease_photo
-- ----------------------------
DROP TABLE IF EXISTS `disease_photo`;
CREATE TABLE `disease_photo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `disease_id` int NOT NULL,
  `url` varchar(255) NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ----------------------------
-- Table structure for lesson_category
-- ----------------------------
DROP TABLE IF EXISTS `lesson_category`;
CREATE TABLE `lesson_category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `lessonId` int NOT NULL,
  `category` varchar(255) NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;