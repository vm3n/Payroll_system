-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: payrolldb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Attendance`
--

DROP TABLE IF EXISTS `Attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `entry_time` datetime NOT NULL,
  `exit_time` datetime DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendance`
--

LOCK TABLES `Attendance` WRITE;
/*!40000 ALTER TABLE `Attendance` DISABLE KEYS */;
INSERT INTO `Attendance` VALUES (1,5,'2025-04-14 06:00:00','2025-04-14 18:03:00','2025-04-14'),(2,5,'2025-04-15 06:07:00','2025-04-15 18:07:00','2025-04-15'),(3,5,'2025-04-16 06:17:00','2025-04-16 18:17:00','2025-04-16'),(4,6,'2025-04-14 08:42:00','2025-04-14 20:42:00','2025-04-14'),(5,6,'2025-04-15 08:53:00','2025-04-15 20:53:00','2025-04-15');
/*!40000 ALTER TABLE `Attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_attendance_insert` AFTER INSERT ON `attendance` FOR EACH ROW BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'INSERT',
    JSON_OBJECT(
      'table', 'Attendance',
      'old_record', NULL,
      'new_record', JSON_OBJECT(
        'attendance_id', NEW.attendance_id,
        'employee_id', NEW.employee_id,
        'entry_time', NEW.entry_time,
        'exit_time', NEW.exit_time,
        'date', NEW.date
      )
    )
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_attendance_update` AFTER UPDATE ON `attendance` FOR EACH ROW BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'UPDATE',
    JSON_OBJECT(
      'table', 'Attendance',
      'old_record', JSON_OBJECT(
        'attendance_id', OLD.attendance_id,
        'employee_id', OLD.employee_id,
        'entry_time', OLD.entry_time,
        'exit_time', OLD.exit_time,
        'date', OLD.date
      ),
      'new_record', JSON_OBJECT(
        'attendance_id', NEW.attendance_id,
        'employee_id', NEW.employee_id,
        'entry_time', NEW.entry_time,
        'exit_time', NEW.exit_time,
        'date', NEW.date
      )
    )
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_attendance_delete` AFTER DELETE ON `attendance` FOR EACH ROW BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    OLD.employee_id,
    'DELETE',
    JSON_OBJECT(
      'table', 'Attendance',
      'old_record', JSON_OBJECT(
        'attendance_id', OLD.attendance_id,
        'employee_id', OLD.employee_id,
        'entry_time', OLD.entry_time,
        'exit_time', OLD.exit_time,
        'date', OLD.date
      ),
      'new_record', NULL
    )
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `AuditLogs`
--

DROP TABLE IF EXISTS `AuditLogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AuditLogs` (
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `details` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`audit_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuditLogs`
--

LOCK TABLES `AuditLogs` WRITE;
/*!40000 ALTER TABLE `AuditLogs` DISABLE KEYS */;
INSERT INTO `AuditLogs` VALUES (1,3,'UPDATE','{\"new_record\": {\"role\": \"manager\", \"email\": \"vineethamallu6@msitprogram.net\", \"salary\": \"8ef064e64a3b29244fd6fee46d1d37d4:2381287cb7c3419a50361e238863bb29\", \"address\": \"New York, NJ\", \"password\": \"$2b$05$Mc4qXtSKGKuyIsBa5EYjlOewVeN/Exvr3Wg7evJAr8uh0aEbYtsNi\", \"username\": \"vineetha\", \"full_name\": \"Vineetha Mallu\", \"hire_date\": \"2025-02-20\", \"created_at\": \"2025-03-06 12:14:03.000000\", \"manager_id\": null, \"updated_at\": \"2025-04-06 20:09:34.000000\", \"employee_id\": 3, \"date_of_birth\": \"2015-12-18\", \"department_id\": 3, \"mobile_number\": \"213456789\", \"twoFactorSecret\": null}, \"old_record\": {\"role\": \"manager\", \"email\": \"vineethamallu6@msitprogram.net\", \"salary\": \"8ef064e64a3b29244fd6fee46d1d37d4:2381287cb7c3419a50361e238863bb29\", \"address\": \"New York, NJ\", \"password\": \"$2b$05$Mc4qXtSKGKuyIsBa5EYjlOewVeN/Exvr3Wg7evJAr8uh0aEbYtsNi\", \"username\": \"vineetha\", \"full_name\": \"Vineetha Mallu\", \"hire_date\": \"2025-02-20\", \"created_at\": \"2025-03-06 12:14:03.000000\", \"manager_id\": null, \"updated_at\": \"2025-03-07 15:33:41.000000\", \"employee_id\": 3, \"date_of_birth\": \"2015-12-18\", \"department_id\": 3, \"mobile_number\": \"123456789\", \"twoFactorSecret\": null}}','2025-04-07 01:09:34'),(2,5,'INSERT','{\"table\": \"LeaveRequests\", \"new_record\": {\"status\": \"pending\", \"end_date\": \"2025-04-11\", \"leave_id\": 1, \"created_at\": \"2025-04-06 23:35:03.000000\", \"leave_type\": \"personal\", \"start_date\": \"2025-04-09\", \"employee_id\": 5}, \"old_record\": null}','2025-04-07 04:35:03'),(3,5,'UPDATE','{\"table\": \"LeaveRequests\", \"new_record\": {\"status\": \"approved\", \"end_date\": \"2025-04-11\", \"leave_id\": 1, \"created_at\": \"2025-04-06 23:35:03.000000\", \"leave_type\": \"personal\", \"start_date\": \"2025-04-09\", \"employee_id\": 5}, \"old_record\": {\"status\": \"pending\", \"end_date\": \"2025-04-11\", \"leave_id\": 1, \"created_at\": \"2025-04-06 23:35:03.000000\", \"leave_type\": \"personal\", \"start_date\": \"2025-04-09\", \"employee_id\": 5}}','2025-04-14 03:01:04'),(4,3,'INSERT','{\"table\": \"LeaveRequests\", \"new_record\": {\"status\": \"pending\", \"end_date\": \"2025-04-16\", \"leave_id\": 2, \"created_at\": \"2025-04-13 22:37:17.000000\", \"leave_type\": \"sick\", \"start_date\": \"2025-04-14\", \"employee_id\": 3}, \"old_record\": null}','2025-04-14 03:37:17'),(5,6,'INSERT','{\"table\": \"LeaveRequests\", \"new_record\": {\"status\": \"pending\", \"end_date\": \"2025-04-23\", \"leave_id\": 3, \"created_at\": \"2025-04-13 23:15:12.000000\", \"leave_type\": \"vacation\", \"start_date\": \"2025-04-21\", \"employee_id\": 6}, \"old_record\": null}','2025-04-14 04:15:12'),(6,9,'INSERT','{\"new_record\": {\"role\": \"employee\", \"email\": \"example@gmail.com\", \"salary\": \"94431bc00b182782a1cd2ab74db0485c:a19efd972074ded2e7f570c47e722c14\", \"address\": \"Dallas, TX\", \"password\": \"$2b$05$035mec6B4.9foDipVTkRk.leoieEuKv3HzMvg84NLOHMAzoZigqEq\", \"username\": \"example\", \"full_name\": \"example\", \"hire_date\": \"2025-04-14\", \"created_at\": \"2025-04-13 23:18:57.000000\", \"manager_id\": 3, \"updated_at\": \"2025-04-13 23:18:57.000000\", \"employee_id\": 9, \"date_of_birth\": \"2005-09-13\", \"department_id\": 4, \"mobile_number\": \"123456098\", \"twoFactorSecret\": null}, \"old_record\": null}','2025-04-14 04:18:57'),(7,3,'INSERT','{\"table\": \"Payroll\", \"new_record\": {\"k401\": \"f1612aec8786fe7eb5ce7cd1d72801ad:d2b0e3831f0e76f30b97ca201bdc795a\", \"ssn_tax\": \"a80752ab4c286409adb70182ee834f38:480ac5a71c945c09b5aac6b0ab8199e9\", \"income_tax\": \"ce28065137b6d5ebc6a11d44e362a0fc:2fa20ccc2670a7c0a16c92c77cc735d4\", \"net_salary\": \"45f0cd401c6cdc157dd391c69ef54c89:528149879a67d77e974b3a1474487549\", \"payroll_id\": 21, \"employee_id\": 3, \"generated_at\": \"2025-04-13 23:21:34.000000\", \"gross_salary\": \"141c868f6665b8694e8e9cf2d87d8856:d36ce735e688a4538df66c569dd9088d\", \"pay_period_end\": \"2025-04-25\", \"health_insurance\": \"e59a804a202c81a32fed2c36bea49d06:4483822eb731bbae923248d0474b7d46\", \"pay_period_start\": \"2025-04-14\"}, \"old_record\": null}','2025-04-14 04:21:34'),(8,5,'INSERT','{\"table\": \"Payroll\", \"new_record\": {\"k401\": \"b4755476b0fec758266f6ac3017fa483:ba65ef58cf9f07771c2c338867db350d\", \"ssn_tax\": \"3aa95e05c07e7c69f6e6ef338a02ab8b:09f826772a9f5e337b301e6e86a856e9\", \"income_tax\": \"ee0d0d952a5c470666581e7d1b65c03e:f170620563078f83c3ae29c86b607163\", \"net_salary\": \"83a7e2fffec107d1309546aebab57a19:d701b5958c89f78709ff6a0057402198\", \"payroll_id\": 22, \"employee_id\": 5, \"generated_at\": \"2025-04-13 23:21:34.000000\", \"gross_salary\": \"e19fa804f9b92eb3889ca3edc9850080:63f38859811f0f960f6b9fb7892a9025\", \"pay_period_end\": \"2025-04-25\", \"health_insurance\": \"757f5563a2ab70cd316ca73c02089a67:747699afb682b903bea7e289e601c0aa\", \"pay_period_start\": \"2025-04-14\"}, \"old_record\": null}','2025-04-14 04:21:34'),(9,6,'INSERT','{\"table\": \"Payroll\", \"new_record\": {\"k401\": \"6fae095ae74cf3b020c55708fafb4233:217a37a2d6ca45b38632b7e4ef118543\", \"ssn_tax\": \"6f60b1146cbaa864956b98317cabb56c:0dbdd2077d202488317ef5ec46f03239\", \"income_tax\": \"ab72ea98cbb4238f640bf3bf393ff9a3:24db10d4b4ad9498be01add3e2f0a926\", \"net_salary\": \"92077fe7dc4dd03de12a9d37a5433e6c:7003d08a83a8e1ab8536ce0fa0882e20\", \"payroll_id\": 23, \"employee_id\": 6, \"generated_at\": \"2025-04-13 23:21:34.000000\", \"gross_salary\": \"2a4b807e7073ecce5a5b2c587459615d:abaf56acb0170f229fcf5a5c5c0f7121\", \"pay_period_end\": \"2025-04-25\", \"health_insurance\": \"9078278685ef9c79ae3503eb3889cf1e:826628400c1fc9cb0ad460fa62deaf47\", \"pay_period_start\": \"2025-04-14\"}, \"old_record\": null}','2025-04-14 04:21:34'),(10,8,'INSERT','{\"table\": \"Payroll\", \"new_record\": {\"k401\": \"5e0c0ae7afa86e0f1aecb284a470ba45:2228bd7d15a7ff1016b29db1bdc74d5b\", \"ssn_tax\": \"5cc65cd8001aa5ecc4cef81c051c559c:1bea99dbfacd4f10f4dad2d56792b427\", \"income_tax\": \"9eca60e84fa37a23cbadec1ca6e2fcfa:46eb23809a41c9439ea7cc835b377084\", \"net_salary\": \"df067e8a54cb95aaca34c40076dd542b:cf1fcf57ab21ab6213d1b86d42ae46be\", \"payroll_id\": 24, \"employee_id\": 8, \"generated_at\": \"2025-04-13 23:21:34.000000\", \"gross_salary\": \"82db02185d101f2552d8918cf6174f9f:8f9162acb09db082003a53a2e0b910ea\", \"pay_period_end\": \"2025-04-25\", \"health_insurance\": \"0858f89c84e261ddecde745e787968cb:e753c31348274bdca29ed4c3fd707022\", \"pay_period_start\": \"2025-04-14\"}, \"old_record\": null}','2025-04-14 04:21:34'),(11,9,'INSERT','{\"table\": \"Payroll\", \"new_record\": {\"k401\": \"f22ba05298a74ec1f639c4988de78933:f34d600345faf9d88a2abceaecf9631e\", \"ssn_tax\": \"93a39d7b533d12a96cbdcc56b619c5be:15ab654c8c877ab56d8cbe6b6ffb6266\", \"income_tax\": \"9c4a7161f5d4ec0e3956cca3189c588b:d2f588921ce1f22026562660c995ddb6\", \"net_salary\": \"85020f8a30ab562066592c7a733f4c09:783ba1c0931c4387fe2e574b923afba9\", \"payroll_id\": 25, \"employee_id\": 9, \"generated_at\": \"2025-04-13 23:21:34.000000\", \"gross_salary\": \"0237d095bd42b90918f85b6819a61a0a:f5adfe63b36512b6f2d39e664a3a9c1a\", \"pay_period_end\": \"2025-04-25\", \"health_insurance\": \"1a16848c376daa16cc5b48d9f94f92fc:9ff68f54fcd3f2f56153748d8a0bd6ef\", \"pay_period_start\": \"2025-04-14\"}, \"old_record\": null}','2025-04-14 04:21:34'),(12,6,'UPDATE','{\"table\": \"LeaveRequests\", \"new_record\": {\"status\": \"approved\", \"end_date\": \"2025-04-23\", \"leave_id\": 3, \"created_at\": \"2025-04-13 23:15:12.000000\", \"leave_type\": \"vacation\", \"start_date\": \"2025-04-21\", \"employee_id\": 6}, \"old_record\": {\"status\": \"pending\", \"end_date\": \"2025-04-23\", \"leave_id\": 3, \"created_at\": \"2025-04-13 23:15:12.000000\", \"leave_type\": \"vacation\", \"start_date\": \"2025-04-21\", \"employee_id\": 6}}','2025-04-14 04:51:02'),(13,5,'INSERT','{\"table\": \"Attendance\", \"new_record\": {\"date\": \"2025-04-14\", \"exit_time\": \"2025-04-14 18:03:00.000000\", \"entry_time\": \"2025-04-14 06:00:00.000000\", \"employee_id\": 5, \"attendance_id\": 1}, \"old_record\": null}','2025-04-14 23:03:21'),(14,5,'INSERT','{\"table\": \"Attendance\", \"new_record\": {\"date\": \"2025-04-15\", \"exit_time\": \"2025-04-15 18:07:00.000000\", \"entry_time\": \"2025-04-15 06:07:00.000000\", \"employee_id\": 5, \"attendance_id\": 2}, \"old_record\": null}','2025-04-14 23:07:42'),(15,5,'INSERT','{\"table\": \"Attendance\", \"new_record\": {\"date\": \"2025-04-16\", \"exit_time\": \"2025-04-16 18:17:00.000000\", \"entry_time\": \"2025-04-16 06:17:00.000000\", \"employee_id\": 5, \"attendance_id\": 3}, \"old_record\": null}','2025-04-14 23:18:00'),(16,6,'INSERT','{\"table\": \"Attendance\", \"new_record\": {\"date\": \"2025-04-14\", \"exit_time\": \"2025-04-14 20:42:00.000000\", \"entry_time\": \"2025-04-14 08:42:00.000000\", \"employee_id\": 6, \"attendance_id\": 4}, \"old_record\": null}','2025-04-15 01:42:41'),(17,6,'INSERT','{\"table\": \"Attendance\", \"new_record\": {\"date\": \"2025-04-15\", \"exit_time\": \"2025-04-15 20:53:00.000000\", \"entry_time\": \"2025-04-15 08:53:00.000000\", \"employee_id\": 6, \"attendance_id\": 5}, \"old_record\": null}','2025-04-15 01:53:15');
/*!40000 ALTER TABLE `AuditLogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Departments`
--

DROP TABLE IF EXISTS `Departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `department_name` (`department_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Departments`
--

LOCK TABLES `Departments` WRITE;
/*!40000 ALTER TABLE `Departments` DISABLE KEYS */;
INSERT INTO `Departments` VALUES (1,'HR','2025-03-06 18:10:59'),(2,'Finance','2025-03-06 18:10:59'),(3,'IT','2025-03-06 18:10:59'),(4,'Sales','2025-03-06 18:10:59');
/*!40000 ALTER TABLE `Departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `manager_id` int DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `hire_date` date NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','manager','employee') NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `twoFactorSecret` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `department_id` (`department_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Departments` (`department_id`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `Employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (3,3,NULL,'8ef064e64a3b29244fd6fee46d1d37d4:2381287cb7c3419a50361e238863bb29','2025-02-20','vineetha','$2b$05$Mc4qXtSKGKuyIsBa5EYjlOewVeN/Exvr3Wg7evJAr8uh0aEbYtsNi','manager','Vineetha Mallu','vineethamallu6@msitprogram.net',NULL,'213456789','2015-12-18','New York, NJ','2025-03-06 18:14:03','2025-04-07 01:09:34'),(5,3,3,'cc4b4d726166ba3dca7b742ab1355dc9:03367c02013182020cf8c2ec2d83eac1','2025-02-27','john_richland','$2b$05$6wky8hPDViWUYUdEOYuhIuzfwBaNGv3OlwyZXK2xb6uhR241cOXuy','employee','John Richland','john_richland@outlook.com',NULL,'123456789','2010-10-12','Knoxville, TN','2025-03-06 18:19:00','2025-04-07 00:54:30'),(6,2,3,NULL,'2025-02-28','sample','$2b$05$PFstzjncsymQgOl79c9au.lgI1mPER4Zze20qu5L5T5jM6RyVxd86','admin','sample test','projecttestmanual@gmail.com',NULL,'123456789','2025-02-20','New york, NJ','2025-03-06 20:20:58','2025-03-07 21:36:32'),(8,4,3,'6391d7624653513829ffdc4b20b5ae08:3dd89ec9e445dc53d04ce3c2b07c83d1','2025-03-03','samplename','$2b$05$vEUn25pQP0OzOsN.K3.RnekbsAgc4p7nu1iiGXAbyZQ1REevmu9j2','manager','sample2','projecttestmanual1@gmail.com',NULL,'123456789','2001-10-02','Los Angles, CA','2025-03-19 21:26:32','2025-03-19 21:26:32'),(9,4,3,'94431bc00b182782a1cd2ab74db0485c:a19efd972074ded2e7f570c47e722c14','2025-04-14','example','$2b$05$035mec6B4.9foDipVTkRk.leoieEuKv3HzMvg84NLOHMAzoZigqEq','employee','example','example@gmail.com',NULL,'123456098','2005-09-13','Dallas, TX','2025-04-14 04:18:57','2025-04-14 04:18:57');
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `audit_employees_insert` AFTER INSERT ON `employees` FOR EACH ROW BEGIN
    INSERT INTO AuditLogs (employee_id, action, details)
    VALUES (
        NEW.employee_id,
        'INSERT',
        JSON_OBJECT(
            'old_record', NULL,
            'new_record', JSON_OBJECT(
                'employee_id', NEW.employee_id,
                'department_id', NEW.department_id,
                'manager_id', NEW.manager_id,
                'salary', NEW.salary,
                'hire_date', NEW.hire_date,
                'username', NEW.username,
                'password', NEW.password,
                'role', NEW.role,
                'full_name', NEW.full_name,
                'email', NEW.email,
                'twoFactorSecret', NEW.twoFactorSecret,
                'mobile_number', NEW.mobile_number,
                'date_of_birth', NEW.date_of_birth,
                'address', NEW.address,
                'created_at', NEW.created_at,
                'updated_at', NEW.updated_at
            )
        )
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `audit_employees_update` AFTER UPDATE ON `employees` FOR EACH ROW BEGIN
    INSERT INTO AuditLogs (employee_id, action, details)
    VALUES (
        NEW.employee_id,
        'UPDATE',
        JSON_OBJECT(
            'old_record', JSON_OBJECT(
                'employee_id', OLD.employee_id,
                'department_id', OLD.department_id,
                'manager_id', OLD.manager_id,
                'salary', OLD.salary,
                'hire_date', OLD.hire_date,
                'username', OLD.username,
                'password', OLD.password,
                'role', OLD.role,
                'full_name', OLD.full_name,
                'email', OLD.email,
                'twoFactorSecret', OLD.twoFactorSecret,
                'mobile_number', OLD.mobile_number,
                'date_of_birth', OLD.date_of_birth,
                'address', OLD.address,
                'created_at', OLD.created_at,
                'updated_at', OLD.updated_at
            ),
            'new_record', JSON_OBJECT(
                'employee_id', NEW.employee_id,
                'department_id', NEW.department_id,
                'manager_id', NEW.manager_id,
                'salary', NEW.salary,
                'hire_date', NEW.hire_date,
                'username', NEW.username,
                'password', NEW.password,
                'role', NEW.role,
                'full_name', NEW.full_name,
                'email', NEW.email,
                'twoFactorSecret', NEW.twoFactorSecret,
                'mobile_number', NEW.mobile_number,
                'date_of_birth', NEW.date_of_birth,
                'address', NEW.address,
                'created_at', NEW.created_at,
                'updated_at', NEW.updated_at
            )
        )
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `audit_employees_delete` AFTER DELETE ON `employees` FOR EACH ROW BEGIN
    INSERT INTO AuditLogs (employee_id, action, details)
    VALUES (
        OLD.employee_id,
        'DELETE',
        JSON_OBJECT(
            'old_record', JSON_OBJECT(
                'employee_id', OLD.employee_id,
                'department_id', OLD.department_id,
                'manager_id', OLD.manager_id,
                'salary', OLD.salary,
                'hire_date', OLD.hire_date,
                'username', OLD.username,
                'password', OLD.password,
                'role', OLD.role,
                'full_name', OLD.full_name,
                'email', OLD.email,
                'twoFactorSecret', OLD.twoFactorSecret,
                'mobile_number', OLD.mobile_number,
                'date_of_birth', OLD.date_of_birth,
                'address', OLD.address,
                'created_at', OLD.created_at,
                'updated_at', OLD.updated_at
            ),
            'new_record', NULL
        )
    );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `LeaveRequests`
--

DROP TABLE IF EXISTS `LeaveRequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LeaveRequests` (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `leave_type` enum('sick','vacation','personal','other') NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`leave_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `leaverequests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LeaveRequests`
--

LOCK TABLES `LeaveRequests` WRITE;
/*!40000 ALTER TABLE `LeaveRequests` DISABLE KEYS */;
INSERT INTO `LeaveRequests` VALUES (1,5,'2025-04-09','2025-04-11','personal','approved','2025-04-07 04:35:03'),(2,3,'2025-04-14','2025-04-16','sick','pending','2025-04-14 03:37:17'),(3,6,'2025-04-21','2025-04-23','vacation','approved','2025-04-14 04:15:12');
/*!40000 ALTER TABLE `LeaveRequests` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_leaverequests_insert` AFTER INSERT ON `leaverequests` FOR EACH ROW BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'INSERT',
    JSON_OBJECT(
      'table', 'LeaveRequests',
      'old_record', NULL,
      'new_record', JSON_OBJECT(
        'leave_id', NEW.leave_id,
        'employee_id', NEW.employee_id,
        'start_date', NEW.start_date,
        'end_date', NEW.end_date,
        'leave_type', NEW.leave_type,
        'status', NEW.status,
        'created_at', NEW.created_at
      )
    )
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_leaverequests_update` AFTER UPDATE ON `leaverequests` FOR EACH ROW BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'UPDATE',
    JSON_OBJECT(
      'table', 'LeaveRequests',
      'old_record', JSON_OBJECT(
        'leave_id', OLD.leave_id,
        'employee_id', OLD.employee_id,
        'start_date', OLD.start_date,
        'end_date', OLD.end_date,
        'leave_type', OLD.leave_type,
        'status', OLD.status,
        'created_at', OLD.created_at
      ),
      'new_record', JSON_OBJECT(
        'leave_id', NEW.leave_id,
        'employee_id', NEW.employee_id,
        'start_date', NEW.start_date,
        'end_date', NEW.end_date,
        'leave_type', NEW.leave_type,
        'status', NEW.status,
        'created_at', NEW.created_at
      )
    )
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Payroll`
--

DROP TABLE IF EXISTS `Payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payroll` (
  `payroll_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `pay_period_start` date NOT NULL,
  `pay_period_end` date NOT NULL,
  `gross_salary` varchar(255) NOT NULL,
  `income_tax` varchar(255) DEFAULT '0',
  `health_insurance` varchar(255) DEFAULT '0',
  `k401` varchar(255) DEFAULT '0',
  `ssn_tax` varchar(255) DEFAULT '0',
  `net_salary` varchar(255) NOT NULL,
  `generated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payroll_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `payroll_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payroll`
--

LOCK TABLES `Payroll` WRITE;
/*!40000 ALTER TABLE `Payroll` DISABLE KEYS */;
INSERT INTO `Payroll` VALUES (13,3,'2025-03-23','2025-04-04','e23184fd3a1b1a51dd9204bb02b9462b:19bc6d2b723179666ec66f2cfc762c6c','fc30d744109174d60ab70363edaba9bb:4142ebecd943e2f31d5c7db17326d747','4e212cb83fa0c927c0c75343dbd75e22:fcf151e24eef697af7d8a56d29fc9283','b744b1d47326913d1380bfc94f9831e0:f70aa2ebf6b1887600034a6cfd34bcaa','b1a5a160ab3f95ae8a473e718d609d37:a727bca0791bc131cd71d928b4d75ee7','0055db4ea2ee5800a71dd99d742c3d12:44105572474c747bff74e061dc1ee609','2025-03-20 02:51:46'),(14,5,'2025-03-23','2025-04-04','9334d026f6c88ed93d8cd99613cc2859:533b8abeed85e187c00a49455946ed58','3e7d07a24e0743f65b8c25916b7d4260:9cfee9ab0c16790ee098b2ba8522d476','5b5153d13a94300b80a375117d699d08:9f17e9e70af3169f066eff4e1e2a85d4','c3f26d2ac0fb20c25c3286fa551c0ad4:6d50f47e7d06fb567153c39f8d44bdab','7bc75c522fdb85071154d52cb543fb14:9719532bf654cfc0c3a952b0b91c8a7a','2b13def35b7ecd04be40d71e341a6ff8:4a36395f618de211f2671750f3464d6e','2025-03-20 02:51:46'),(15,6,'2025-03-23','2025-04-04','8c870d6a6ec3ee927212d596233b5902:e1e3782a168d474d5225c5c77dda677f','119f14ef15ae318ca4f7e6861b2b2f2f:0b91ea1570ca80004f25ec14450a4297','6c87157f9bd66db251e3c42c3e5f8bfa:31efb4bd40f588d408bb8b4dcb7619d4','9eff2a2526bc96ee20246dd8e8e6548d:fe40a518c88f55ea1882fe6fde693a9a','1ad56e3ee7654789a114fe54980d884a:98b8297c877957bb532c184799fe5589','9c50d7229da9df0ba10c7a30ddddbb89:093e8c7d308b26a286ae8fded958dc64','2025-03-20 02:51:46'),(16,8,'2025-03-23','2025-04-04','6a66b1c66c8ecf493ac5ba7731f44f84:e7d42b8d1cdb2db8ef42889b45ff6275','27b9e57a68ac6ee462b25246d00e25b5:5cdc6b9ea071fcb619928d65e4cca1af','39858305ffe5cd3019be149a3fb99919:d169b1fddd8255e2aabbb4a182a5b918','26a118907617564c2c16750268ccd56a:5544a01d180d56acbade106dba4d3b0c','b9f71274686fe489ec72d3b20a920d0b:80ceb1c61f88b739c955e3d51e820863','fcc54cd783708914df9aba350270b158:2c9fef03823842fb4e2f8ca33b4a6585','2025-03-20 02:51:46'),(17,3,'2025-03-03','2025-03-14','98097da1e308e634ed2cc052e9e28ad3:7765c25c6f8649e1712c83d8186e9a81','f35ac255c00e8cecbc7c17c65dde6cb2:e79ebe2fff14a89435f996eac2ac0308','d9bc2098a3266cfe6dba8488bd12277d:385a128ca54a9cda6cb902d58224eca2','63cae2181e0ff78c930188231aff2384:3262f1952e91d06e762af24c5508bda1','31c38799c19062865aa109199a9b41f8:cf42218cc2467c8044814eb48209946b','0c7cdbb70a1f0f37c9f7ba30d058c027:b5ee2e9b98bf93abdd180b5d217968a3','2025-03-20 22:13:50'),(18,5,'2025-03-03','2025-03-14','7302085220263a51075eafa3b5425316:0cd801d0942065314f446b7946194634','8417e2eb5627e5cc99fcc6b2024477ea:2daf9d0ea2cd24ee4ece287961d5cf94','59608db6698dc4769c199538679b890d:f706b5846e08734edf8bd6d1f886970c','5e60355efe662b03f19f662507437931:ae350c64fa206bef820410d5e55ee1b4','04bef454f078d0a752c70c4585db2666:35baf82fe295e6a2dd335e2dd4dd3615','0d256c978ab6ed769b8a315748737bcd:022016555dbf461346870a743301a1cf','2025-03-20 22:13:50'),(19,6,'2025-03-03','2025-03-14','0b54399ee650a883cdeb7ead464adfcc:fc9b1815d50fab76bfc30a37aaec3e38','4d1a7849789fe7c9a78f3aabce5d6975:aca7f26fbed17e0b94f6f3a1b617d0a7','a31593534de4ecbb8ef7f3010b047c4e:f726db8f8da41a00f02f3d87807dc360','3215aaa7e8288c6b2074428a4bdf8d86:552b5bae057e22f42ae0ed7096c16f1b','a4be69c04f1d0ff07c14749eebd7af5d:fa73f29eb3dc8f0a77b3e928eedd32da','30ad45a731586851522d470b59b1a4eb:2fe95bb67e6c01d7077252f59091a085','2025-03-20 22:13:50'),(20,8,'2025-03-03','2025-03-14','1a8013b19552093ed2c1399a46c12d76:839da14ef863085c3f5e29e170f34100','315c32f7aa01e7a01f8686df88221d84:8ca203a2a238f405654da57f57ed0a28','4e8447cd8cbf0147f17941305faeca14:b2f1c3250943ef1dff1d25a7db715b14','a18b617f58335baa4b2af6aab50fa0ad:2588863f384c2d84becfadaf2067b413','7ecf36fd197f8e559cbbfc2097cb82ac:2009a7cd786428a5a0ec3b3f66277c20','ebee4d4ed42ec921ae8b4602f7d3cdaa:8f1509f3d6e31f40eb957c534428669f','2025-03-20 22:13:50'),(21,3,'2025-04-14','2025-04-25','141c868f6665b8694e8e9cf2d87d8856:d36ce735e688a4538df66c569dd9088d','ce28065137b6d5ebc6a11d44e362a0fc:2fa20ccc2670a7c0a16c92c77cc735d4','e59a804a202c81a32fed2c36bea49d06:4483822eb731bbae923248d0474b7d46','f1612aec8786fe7eb5ce7cd1d72801ad:d2b0e3831f0e76f30b97ca201bdc795a','a80752ab4c286409adb70182ee834f38:480ac5a71c945c09b5aac6b0ab8199e9','45f0cd401c6cdc157dd391c69ef54c89:528149879a67d77e974b3a1474487549','2025-04-14 04:21:34'),(22,5,'2025-04-14','2025-04-25','e19fa804f9b92eb3889ca3edc9850080:63f38859811f0f960f6b9fb7892a9025','ee0d0d952a5c470666581e7d1b65c03e:f170620563078f83c3ae29c86b607163','757f5563a2ab70cd316ca73c02089a67:747699afb682b903bea7e289e601c0aa','b4755476b0fec758266f6ac3017fa483:ba65ef58cf9f07771c2c338867db350d','3aa95e05c07e7c69f6e6ef338a02ab8b:09f826772a9f5e337b301e6e86a856e9','83a7e2fffec107d1309546aebab57a19:d701b5958c89f78709ff6a0057402198','2025-04-14 04:21:34'),(23,6,'2025-04-14','2025-04-25','2a4b807e7073ecce5a5b2c587459615d:abaf56acb0170f229fcf5a5c5c0f7121','ab72ea98cbb4238f640bf3bf393ff9a3:24db10d4b4ad9498be01add3e2f0a926','9078278685ef9c79ae3503eb3889cf1e:826628400c1fc9cb0ad460fa62deaf47','6fae095ae74cf3b020c55708fafb4233:217a37a2d6ca45b38632b7e4ef118543','6f60b1146cbaa864956b98317cabb56c:0dbdd2077d202488317ef5ec46f03239','92077fe7dc4dd03de12a9d37a5433e6c:7003d08a83a8e1ab8536ce0fa0882e20','2025-04-14 04:21:34'),(24,8,'2025-04-14','2025-04-25','82db02185d101f2552d8918cf6174f9f:8f9162acb09db082003a53a2e0b910ea','9eca60e84fa37a23cbadec1ca6e2fcfa:46eb23809a41c9439ea7cc835b377084','0858f89c84e261ddecde745e787968cb:e753c31348274bdca29ed4c3fd707022','5e0c0ae7afa86e0f1aecb284a470ba45:2228bd7d15a7ff1016b29db1bdc74d5b','5cc65cd8001aa5ecc4cef81c051c559c:1bea99dbfacd4f10f4dad2d56792b427','df067e8a54cb95aaca34c40076dd542b:cf1fcf57ab21ab6213d1b86d42ae46be','2025-04-14 04:21:34'),(25,9,'2025-04-14','2025-04-25','0237d095bd42b90918f85b6819a61a0a:f5adfe63b36512b6f2d39e664a3a9c1a','9c4a7161f5d4ec0e3956cca3189c588b:d2f588921ce1f22026562660c995ddb6','1a16848c376daa16cc5b48d9f94f92fc:9ff68f54fcd3f2f56153748d8a0bd6ef','f22ba05298a74ec1f639c4988de78933:f34d600345faf9d88a2abceaecf9631e','93a39d7b533d12a96cbdcc56b619c5be:15ab654c8c877ab56d8cbe6b6ffb6266','85020f8a30ab562066592c7a733f4c09:783ba1c0931c4387fe2e574b923afba9','2025-04-14 04:21:34');
/*!40000 ALTER TABLE `Payroll` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_payroll_insert` AFTER INSERT ON `payroll` FOR EACH ROW BEGIN
  INSERT INTO AuditLogs (employee_id, action, details)
  VALUES (
    NEW.employee_id,
    'INSERT',
    JSON_OBJECT(
      'table', 'Payroll',
      'old_record', NULL,
      'new_record', JSON_OBJECT(
        'payroll_id', NEW.payroll_id,
        'employee_id', NEW.employee_id,
        'pay_period_start', NEW.pay_period_start,
        'pay_period_end', NEW.pay_period_end,
        'gross_salary', NEW.gross_salary,
        'income_tax', NEW.income_tax,
        'health_insurance', NEW.health_insurance,
        'k401', NEW.k401,
        'ssn_tax', NEW.ssn_tax,
        'net_salary', NEW.net_salary,
        'generated_at', NEW.generated_at
      )
    )
  );
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 17:16:00
