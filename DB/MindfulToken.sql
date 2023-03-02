-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: mindful
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appVersion`
--

DROP TABLE IF EXISTS `appVersion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appVersion` (
  `versionId` int NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `versionNo` varchar(45) NOT NULL COMMENT 'Version No. (e.g. 1.0.1)',
  `versionName` varchar(45) NOT NULL COMMENT 'Name of the Version',
  `releaseDate` datetime NOT NULL COMMENT 'Release Date of this version',
  `expireDate` datetime NOT NULL COMMENT 'Expire Date of this version',
  `description` varchar(500) DEFAULT NULL COMMENT 'Description of the version release',
  PRIMARY KEY (`versionId`),
  UNIQUE KEY `versionNo_UNIQUE` (`versionNo`),
  UNIQUE KEY `versionName_UNIQUE` (`versionName`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appVersion`
--

LOCK TABLES `appVersion` WRITE;
/*!40000 ALTER TABLE `appVersion` DISABLE KEYS */;
INSERT INTO `appVersion` VALUES (1,'0.0.1','initial version','2023-02-17 00:00:00','2023-03-10 00:00:00','1st version'),(2,'0.0.3','MVP version','2023-04-01 00:00:00','2023-04-30 00:00:00','3rd version'),(4,'0.0.2','2nd version','2023-03-02 00:00:00','2023-04-01 00:00:00','2nd version'),(5,'0.0.4','4th version','2023-05-17 01:01:01','2023-06-17 02:02:02','4th'),(6,'0.0.5','5th version','2023-06-17 03:03:03','2023-07-17 04:04:04','5th'),(7,'0.0.6','6th edited version','2024-01-01 00:00:00','2025-01-01 00:00:00','edited version testing');
/*!40000 ALTER TABLE `appVersion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artwork`
--

DROP TABLE IF EXISTS `artwork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artwork` (
  `artworkId` int NOT NULL AUTO_INCREMENT COMMENT 'Artwork ID',
  `userId` int NOT NULL,
  `name` varchar(100) DEFAULT NULL COMMENT 'Name of the artwork',
  `URL` varchar(500) NOT NULL COMMENT 'URL of the upload artwork',
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`artworkId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,1,'artwork1','https://abc.com/jfk.png','png file'),(2,1,'artwork2','https://xyz.com/1.html','html text'),(3,1,'artwork3','https://111.com/a.gif','gif animation'),(4,2,'artworkA','https://222.com/321.avi','movie file'),(5,2,'artworkB','https://333.com/sound.mp4','sound track'),(6,3,'artworkwhatisthis','https://kkk.com/blablabla.gif','gif picture'),(7,4,'artworktest1','http://artworktest1','test1'),(8,5,'artworktest2','http://artworktest2','test2'),(9,1,'artwork modified','https://modified.com','artwork modify testing');
/*!40000 ALTER TABLE `artwork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `eventId` int NOT NULL AUTO_INCREMENT COMMENT 'Event ID',
  `title` varchar(500) NOT NULL COMMENT 'Title of the event',
  `paragraphText` varchar(2000) NOT NULL COMMENT 'Paragraph text of the event',
  `image` varchar(200) DEFAULT NULL COMMENT 'URL of the event image',
  `hyperlink` varchar(200) DEFAULT NULL COMMENT 'Hyperlink providing more description of the event',
  `timerDescription` varchar(2000) DEFAULT NULL COMMENT 'Description of the timer',
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  PRIMARY KEY (`eventId`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'eventD','eventD description','http://www.abc.com/a.png','http://www.abc.com/eventD.html','timerDescriptionD','2022-06-09 09:00:10','2022-10-09 09:00:10'),(2,'eventK','eventK description','http://www.abc.com/b.png','http://www.abc.com/eventK.html','timerDescriptionK','2022-06-09 09:00:10','2022-10-09 09:00:10'),(3,'eventC','eventC description','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10'),(4,'eventA','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10'),(5,'eventB','eventB description','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','2022-06-09 09:00:10','2022-10-09 09:00:10'),(6,'eventE','eventC description','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10'),(7,'eventF','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10'),(8,'eventG','eventB description','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','2022-06-09 09:00:10','2022-10-09 09:00:10'),(9,'eventH','eventC description','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10'),(10,'eventI','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joinedEvent`
--

DROP TABLE IF EXISTS `joinedEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joinedEvent` (
  `joinedEventId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `eventId` int NOT NULL,
  PRIMARY KEY (`joinedEventId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joinedEvent`
--

LOCK TABLES `joinedEvent` WRITE;
/*!40000 ALTER TABLE `joinedEvent` DISABLE KEYS */;
INSERT INTO `joinedEvent` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,3,7),(8,3,8),(9,3,9),(10,4,6),(11,5,7),(12,6,8);
/*!40000 ALTER TABLE `joinedEvent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalWebsite`
--

DROP TABLE IF EXISTS `personalWebsite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personalWebsite` (
  `websiteId` int NOT NULL AUTO_INCREMENT COMMENT 'Website ID',
  `userId` int NOT NULL,
  `URL` varchar(500) NOT NULL COMMENT 'URL of the website',
  `description` varchar(500) DEFAULT NULL COMMENT 'Description of the website',
  PRIMARY KEY (`websiteId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalWebsite`
--

LOCK TABLES `personalWebsite` WRITE;
/*!40000 ALTER TABLE `personalWebsite` DISABLE KEYS */;
INSERT INTO `personalWebsite` VALUES (1,1,'https://abc.com','desc1'),(2,1,'https://def.com','desc2'),(3,1,'https://ghi.com','desc3'),(4,2,'https://123.com','show1'),(5,2,'https://456.com','show2'),(6,2,'https://789.com','show3'),(7,3,'https://111.com','detail1'),(8,3,'https://222.com','detail2'),(9,1,'https://modified.com','personalwebsite modify testing'),(10,4,'https://1.com','new 1'),(11,5,'https://2.com','new 2'),(12,6,'https://3.com','new 3');
/*!40000 ALTER TABLE `personalWebsite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `appleId` varchar(45) NOT NULL COMMENT 'Apple ID',
  `walletAddress` varchar(45) DEFAULT NULL COMMENT 'Crypto wallet address',
  `personInfo` varchar(1000) DEFAULT NULL,
  `createTime` datetime NOT NULL COMMENT 'Record create time',
  `updateTime` datetime NOT NULL COMMENT 'Record update time',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `twitterId_UNIQUE` (`appleId`),
  UNIQUE KEY `walletAddress_UNIQUE` (`walletAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'me@appple.com','0x46Ac9Ec2759e2C3A73e9e4624D284F810d3c4005','User me for testing','2022-12-01 00:00:00','2023-01-01 00:00:00'),(2,'you@apple.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA9a','free text for editing','2023-01-02 10:00:00','2023-01-31 01:00:00'),(3,'we@apple.com','0x1BC91e17a84D65d750aB671Fc1D2038a42A69948','say something about you','2023-02-28 00:00:00','2023-03-20 00:00:00'),(4,'xx@xx.com','0xbA87C344Aea90A5ad73b197b34dB2DfBa66398Fd','This is a modified msg','2024-05-17 01:01:01','2025-06-17 02:02:02'),(5,'yy@yy.com','0x54B6Acc64bf7A7cf7450a2C3025c29dC71974c1E','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02'),(6,'zz@zz.com','0xef4cF75b222c45C89D315Ba1781C85E81D0F2832','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02');
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

-- Dump completed on 2023-03-02 21:58:34
