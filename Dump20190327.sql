use realkickstart;
/* events DB */
DROP TABLE IF EXISTS `kickstart_events`;
SET character_set_client = utf8mb4;
CREATE TABLE `kickstart_events` (
  `events_id` int(11) NOT NULL AUTO_INCREMENT,
  `events_title` varchar(100) NOT NULL,
  `events_date` date NOT NULL,
  `events_end_time` time NOT NULL,
  `events_goal` int(5) NOT NULL,
  `events_desc` varchar(1000) NOT NULL,
  `events_isFinished` tinyint(1) NOT NULL DEFAULT '0',
  `events_ammount` int(5) NOT NULL,
  `staff_id` varchar(12) NOT NULL,
  PRIMARY KEY (`events_id`)
)
/* user DB */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `users_id` varchar(12) NOT NULL,
  `users_pw` varchar(40) NOT NULL,
  `users_type` varchar(10) NOT NULL,
  `users_point` int(5) NOT NULL DEFAULT '0',
  `users_firstName` varchar(50) NOT NULL,
  `users_lastName` varchar(50) NOT NULL,
  `users_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`users_id`)
)