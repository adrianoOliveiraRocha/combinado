-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: combinado
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `combinado`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `combinado` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `combinado`;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `_text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Message`
--

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;
INSERT INTO `Message` VALUES (1,'client@email.com','undefined'),(2,'client@email.com','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),(3,'client@email.com','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),(4,'client@email.com','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),(5,'client@email.com','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),(6,'client@email.com','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '),(7,'client@email.com','just a test again');
/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentRequest`
--

DROP TABLE IF EXISTS `PaymentRequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentRequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentLink` varchar(100) NOT NULL,
  `userId` int NOT NULL,
  `message` text,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `PaymentRequest_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentRequest`
--

LOCK TABLES `PaymentRequest` WRITE;
/*!40000 ALTER TABLE `PaymentRequest` DISABLE KEYS */;
/*!40000 ALTER TABLE `PaymentRequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `userid` int NOT NULL,
  `aboutMe` text,
  `image` varchar(800) DEFAULT NULL,
  `type` tinyint(1) DEFAULT '2',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `employeeId` (`id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'ali@email.com','f5df4313797caf372fe62688f90c022c','Aline Moreira','(85)999887766','Rua Almeida Prado 34',4,'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.','1570192902293.jpeg',2),(2,'hel@email.com','8489d1b602d26cba00de427e20614c83','Helena Sales','(88)988764532','Rua Francisco Borges, 456',4,'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.','1570193204869.jpg',2),(3,'fab@email.com','fae7d9bf1ee1b1c9fe1f964918dba395',' Fabrícia Claim ','','Av. Alvarez dos Anjos, 890',6,'Hello! I am a pedicure with 12 eyers of experience. I studied this since my 10 old. I hoppe I will be useful to you. Thanks!','1571314795918.jpeg',2),(15,'jul@email.com','5ed0bf220c90d8ace24008f01f8038ca','Juliana Pereira','(85)999473839','Rua Juliano Mattos, 45',6,'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.','1571392820973.jpg',2),(28,'fla@email.com','2b3c512370e903a0569fffe881aa0380','Flávia Gomes',NULL,NULL,4,NULL,NULL,2),(29,'she@email.com','f6e6dc2fb6a84b28483fabecdc9ada1f','Sheila Moreira',NULL,NULL,4,NULL,NULL,2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_day`
--

DROP TABLE IF EXISTS `employee_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_day` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int NOT NULL,
  `dayCode` tinyint(1) NOT NULL,
  `queryTime` int NOT NULL DEFAULT '15',
  `morningInit` time DEFAULT NULL,
  `morningEnd` time DEFAULT NULL,
  `afternoonInit` time DEFAULT NULL,
  `afternoonEnd` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employeeId` (`employeeId`),
  KEY `employeeDayId` (`id`),
  CONSTRAINT `employee_day_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_day`
--

LOCK TABLES `employee_day` WRITE;
/*!40000 ALTER TABLE `employee_day` DISABLE KEYS */;
INSERT INTO `employee_day` VALUES (1,1,0,15,NULL,NULL,NULL,NULL),(2,1,1,15,'07:30:00','11:40:00','13:40:00','17:45:00'),(3,1,2,15,'08:00:00','12:30:00','14:00:00','17:30:00'),(4,1,3,15,'08:30:00','12:45:00','13:45:00','17:50:00'),(5,1,4,15,'07:30:00','12:00:00','13:30:00','17:00:00'),(6,1,5,15,'08:00:00','11:30:00','13:45:00','17:45:00'),(7,1,6,15,'07:30:00','12:00:00','13:30:00','17:45:00'),(15,3,0,15,NULL,NULL,NULL,NULL),(16,3,1,15,'08:00:00','11:50:00','14:00:00','18:00:00'),(17,3,2,15,'07:45:00','11:00:00','13:45:00','17:45:00'),(18,3,3,15,'08:00:00','11:00:00','13:00:00','17:00:00'),(19,3,4,15,'07:45:00','11:45:00','13:45:00','17:45:00'),(20,3,5,15,'08:50:00','11:45:00','14:50:00','18:50:00'),(21,3,6,15,'09:00:00','12:00:00',NULL,NULL),(99,15,0,15,NULL,NULL,NULL,NULL),(100,15,1,15,'07:45:00','11:45:00','13:00:00','17:00:00'),(101,15,2,15,'08:00:00','11:45:00','13:45:00','17:45:00'),(102,15,3,15,'07:50:00','11:45:00','14:20:00','18:00:00'),(103,15,4,15,'08:50:00','11:50:00','13:45:00','17:50:00'),(104,15,5,15,'08:00:00','11:00:00','13:20:00','17:50:00'),(105,15,6,15,'08:50:00','11:30:00',NULL,NULL),(120,28,0,15,NULL,NULL,NULL,NULL),(121,28,1,15,NULL,NULL,NULL,NULL),(122,28,2,15,NULL,NULL,NULL,NULL),(123,28,3,15,NULL,NULL,NULL,NULL),(124,28,4,15,NULL,NULL,NULL,NULL),(125,28,5,15,NULL,NULL,NULL,NULL),(126,28,6,15,NULL,NULL,NULL,NULL),(127,29,0,15,NULL,NULL,NULL,NULL),(128,29,1,15,NULL,NULL,NULL,NULL),(129,29,2,15,NULL,NULL,NULL,NULL),(130,29,3,15,NULL,NULL,NULL,NULL),(131,29,4,15,NULL,NULL,NULL,NULL),(132,29,5,15,NULL,NULL,NULL,NULL),(133,29,6,15,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `employee_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_service`
--

DROP TABLE IF EXISTS `employee_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeid` int NOT NULL,
  `serviceid` int NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `employeeid` (`employeeid`),
  KEY `serviceid` (`serviceid`),
  KEY `employeeServiceId` (`id`),
  CONSTRAINT `employee_service_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  CONSTRAINT `employee_service_ibfk_2` FOREIGN KEY (`employeeid`) REFERENCES `employee` (`id`),
  CONSTRAINT `employee_service_ibfk_3` FOREIGN KEY (`serviceid`) REFERENCES `service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_service`
--

LOCK TABLES `employee_service` WRITE;
/*!40000 ALTER TABLE `employee_service` DISABLE KEYS */;
INSERT INTO `employee_service` VALUES (3,1,1,4),(4,1,3,4),(5,2,2,4),(6,2,4,4),(12,3,16,6),(13,3,18,6),(14,15,16,6),(15,15,18,6),(17,28,3,4),(18,29,1,4),(19,29,3,4),(20,29,4,4);
/*!40000 ALTER TABLE `employee_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduling`
--

DROP TABLE IF EXISTS `scheduling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scheduling` (
  `id` int NOT NULL AUTO_INCREMENT,
  `_datetime` datetime DEFAULT NULL,
  `comments` text,
  `clientPhone` varchar(30) NOT NULL,
  `clientEmail` varchar(100) NOT NULL,
  `employeeId` int NOT NULL,
  `canceled` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `employeeId` (`employeeId`),
  KEY `schedulingId` (`id`),
  KEY `_datetime` (`_datetime`),
  CONSTRAINT `scheduling_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduling`
--

LOCK TABLES `scheduling` WRITE;
/*!40000 ALTER TABLE `scheduling` DISABLE KEYS */;
INSERT INTO `scheduling` VALUES (1,'2019-10-25 09:45:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','0000000000','client1@email.com',1,1),(2,'2019-10-15 16:45:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','85978766655','client2@email.com',2,0),(3,'2019-10-15 10:10:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','88987667654','client3@email.com',2,0),(4,'2019-10-15 10:50:00','I did via smartphone ','85936521470','client4@email.com',2,0),(5,'2019-10-31 15:30:00','I am the client 5','85936521478','client5@email.com',1,0),(6,'2019-11-14 18:10:00','I am the client 6','85963214580','client6@email.com',2,1),(7,'2019-10-23 15:45:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','85988776253','client7@email.com',1,0),(8,'2019-10-23 15:45:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','85988776253','client7@email.com',1,0),(9,'2019-10-23 16:15:00','Client 8','85963254780','client8@gmail.com',1,0),(10,'2019-10-30 15:30:00','Test client 9','85936521470','client9@email.com',2,0),(11,'2019-10-24 17:10:00','Client 10','85963251480','client10@email.com',2,0),(12,'2019-10-04 15:45:00','Client 11','85963254177','client11@email.com',1,0),(13,'2019-11-13 17:15:00','Client 12','8596523258','client12@email.com',1,0),(14,'2019-10-24 18:30:00','Client 13','85980563240','client13@email.com',2,0),(15,'2019-10-24 16:00:00','14','85988765432','client14@email',1,0),(16,'2019-10-26 12:00:00','Test','85963251470','test@email.com',1,0),(17,'2019-10-26 12:40:00','I just can speak English when the subject is computing','85723145539','test@email.com',2,0),(18,'2019-10-30 15:50:00','Eu posso fala em duas lingua ta legal?','85963214578','test@email.com',2,1),(19,'2019-11-19 16:30:00','My system is working well now','85326547800','test@email.com',1,0),(20,'2019-10-25 11:30:00','Obs','85963254580','test@email.com',1,0),(21,'2019-10-17 17:30:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','8534321210','client@gmail.com',2,0),(22,'2019-10-31 16:10:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','85987563322','felicia@yahoo.com.br',2,0),(23,'2019-10-16 13:10:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','(85)99887722','client1@email.com',2,0),(24,'2019-10-17 15:30:00','This is a test','(85)86844184','vanessacarvalho1@gmail.com',2,0),(26,'2019-11-30 10:35:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','(85)999473839','client@email.com',15,0),(27,'2019-11-29 15:20:00','Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ','(85)999473839','client@email.com',3,0),(28,'2021-10-23 07:30:00','I believe this is a good idea','(85)999473839','adriano.qw32@yahoo.com.br',1,0),(29,'2021-10-27 12:15:00','This is just one more test. Ok?','(85)999473839','adriano.qw32@yahoo.com.br',1,0),(30,'2021-10-28 15:30:00','Tests and more tests','(85)999473839','adriano.qw32@yahoo.com.br',15,1),(31,'2021-11-24 14:35:00','I really like tests','(85)999473839','adriano.qw32@yahoo.com.br',15,1),(32,'2021-11-24 14:35:00','I really like tests','(85)999473839','adriano.qw32@yahoo.com.br',15,1),(33,'2021-11-24 14:35:00','I really like tests','(85)999473839','adriano.qw32@yahoo.com.br',15,1),(34,'2021-10-29 15:20:00','Oh my goshhhh','(85)999473839','adriano.qw32@yahoo.com.br',15,0),(35,'2021-11-25 10:15:00','Now, I have a hora with this professional','(85)999473839','adriano.qw32@yahoo.com.br',3,0);
/*!40000 ALTER TABLE `scheduling` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `serviceId` (`id`),
  CONSTRAINT `service_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Service 1',4),(2,'Service 2',4),(3,'Service 3',4),(4,'Service 4',4),(5,'Service 5',4),(6,'Hair Stylist',5),(7,'Manicure',5),(8,'Pedicure',5),(9,'Eyebrow Design',5),(16,'Service1',6),(17,'Service2',6),(18,'Service3',6);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('8zgeyegEt8hfGjOav_26Q0YSNqFAeLFk',1635947218,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"message\":\"\",\"error\":\"\",\"user\":{\"id\":4,\"username\":\"Marcos Silva\",\"pwd\":\"2a17f94cc5c3946e5500689dd2933657\",\"creationDate\":\"2019-07-07T12:25:41.000Z\",\"website\":\"https://www.google.com\",\"color1\":null,\"color2\":null,\"email\":\"mar@email.com\",\"admin\":0,\"image\":\"1569587616897.jpg\",\"blocked\":0,\"joinedToken\":\"EC-9HU263647L0407615\",\"pwdDecrypted\":\"mar123\"},\"loged\":true}'),('o3iLuZzv4g_RIbvTs2nOjDucX8KDC3E_',1635873676,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"message\":\"\",\"error\":\"\",\"user\":{\"id\":4,\"username\":\"Marcos Silva\",\"pwd\":\"2a17f94cc5c3946e5500689dd2933657\",\"creationDate\":\"2019-07-07T12:25:41.000Z\",\"website\":\"https://www.google.com\",\"color1\":null,\"color2\":null,\"email\":\"mar@email.com\",\"admin\":0,\"image\":\"1569587616897.jpg\",\"blocked\":0,\"joinedToken\":\"EC-9HU263647L0407615\",\"pwdDecrypted\":\"mar123\"},\"loged\":true}'),('pdA2RkMrIIT5tH-5Lyb2Fshvw0GxCDRs',1635880960,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"message\":\"\",\"error\":\"\",\"user\":{\"id\":4,\"username\":\"Marcos Silva\",\"pwd\":\"2a17f94cc5c3946e5500689dd2933657\",\"creationDate\":\"2019-07-07T12:25:41.000Z\",\"website\":\"https://www.google.com\",\"color1\":null,\"color2\":null,\"email\":\"mar@email.com\",\"admin\":0,\"image\":\"1569587616897.jpg\",\"blocked\":0,\"joinedToken\":\"EC-9HU263647L0407615\",\"pwdDecrypted\":\"mar123\"},\"loged\":true}'),('sMvDo-twOzgvsxqzm8TChGQG1gudOMKa',1635879448,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"message\":\"\",\"error\":\"\",\"user\":{\"id\":4,\"username\":\"Marcos Silva\",\"pwd\":\"2a17f94cc5c3946e5500689dd2933657\",\"creationDate\":\"2019-07-07T12:25:41.000Z\",\"website\":\"https://www.google.com\",\"color1\":null,\"color2\":null,\"email\":\"mar@email.com\",\"admin\":0,\"image\":\"1569587616897.jpg\",\"blocked\":0,\"joinedToken\":\"EC-9HU263647L0407615\",\"pwdDecrypted\":\"mar123\"},\"loged\":true}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `pwd` varchar(100) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `website` varchar(200) DEFAULT NULL,
  `color1` varchar(7) DEFAULT NULL,
  `color2` varchar(7) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `image` varchar(500) DEFAULT NULL,
  `blocked` tinyint(1) NOT NULL DEFAULT '0',
  `joinedToken` varchar(500) DEFAULT 'no-agreement',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `userId` (`id`),
  KEY `admin` (`admin`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Adriano Oliveira','e77cb965bf3d3a67f1aacab36cf1e136','2019-01-01 00:00:00','',NULL,NULL,'adriano.qwe32@gmail.com',1,'1567768213162.png',0,'admin'),(4,'Marcos Silva','2a17f94cc5c3946e5500689dd2933657','2019-07-07 09:25:41','https://www.google.com',NULL,NULL,'mar@email.com',0,'1569587616897.jpg',0,'EC-9HU263647L0407615'),(5,'Jully Albuquerque','5ed0bf220c90d8ace24008f01f8038ca','2019-10-17 08:04:58','https://google.com',NULL,NULL,'jully@email.com',0,'1571310377179.jpg',0,'no-agreement'),(6,'Emma Thompsom','354d8f8528b672a914c00d1ebdba8318','2019-10-17 09:12:15','https://yahoo.com','#3322dd','#cc3445','emm@email.com',0,'1571314364800.jpeg',0,'no-agreement');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-02 13:31:50
