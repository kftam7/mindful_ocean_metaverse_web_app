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
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`versionId`),
  UNIQUE KEY `versionNo_UNIQUE` (`versionNo`),
  UNIQUE KEY `versionName_UNIQUE` (`versionName`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appVersion`
--

LOCK TABLES `appVersion` WRITE;
/*!40000 ALTER TABLE `appVersion` DISABLE KEYS */;
INSERT INTO `appVersion` VALUES (1,'0.0.1','initial version','2023-02-17 00:00:00','2023-03-10 00:00:00','1st version',1),(2,'0.0.3','MVP version','2023-04-01 00:00:00','2023-04-30 00:00:00','3rd version',1),(4,'0.0.2','2nd version','2023-03-02 00:00:00','2023-04-01 00:00:00','2nd version',1),(5,'0.0.4','4th version','2023-05-17 01:01:01','2023-06-17 02:02:02','4th',1),(6,'0.0.5','5th version','2023-06-17 03:03:03','2023-07-17 04:04:04','5th',1),(7,'0.0.6','6th edited version','2023-01-01 00:00:00','2025-01-01 00:00:00','edited version testing',0),(17,'0.0.12','12th version','2023-05-17 01:01:01','2023-06-17 02:02:02','undefined',1),(18,'0.0.13','13th version','2023-06-17 03:03:03','2023-07-17 04:04:04','undefined',1),(19,'0.0.14','98th version','2023-08-17 05:05:09','2023-09-02 07:06:06','something here',1),(31,'0.0.99','99th version','2023-05-17 01:01:01','2023-06-17 02:02:02','undefined',1),(33,'1','1','2023-04-04 08:02:06','2023-04-04 08:02:14','undefined',1),(36,'0.0009','9thth','2023-04-06 02:25:23','2023-04-27 02:25:27','tests9',0);
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
  `type` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `nftStorage` varchar(100) DEFAULT NULL COMMENT 'URI for NFT Storage',
  `extraInfo` varchar(500) DEFAULT NULL,
  `ifHomepage` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the artwork is to displayed on the homepage, default is 0',
  `createTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00',
  `updateTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00',
  `ifMinted` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the artwork is minted for mintPass',
  PRIMARY KEY (`artworkId`),
  UNIQUE KEY `UNIQUE` (`userId`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,1,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','desctest1','ipfs://bafyreieztyf4khhcql3m4q6eheovgnohpp4oypwyzfh27qo2szkzxc2wly/metadata.json','extratest1',1,'2021-01-01 00:00:00','2023-06-15 23:58:42',1),(2,1,'artwork2','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','html text',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(3,1,'artwork3','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','gif animation',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(4,2,'artworkA','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','movie file','ipfs://bafyreieywdrm3dm6cj7ejbgaofk36wuyck2ohovklg6nfq75v5o3wvmjby/metadata.json',NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(5,2,'artworkB','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','sound track','ipfs://bafyreidahw33qr6resa6a3mrsff2h5743fkhwg6gk73zqjlmzhj7q4slr4/metadata.json',NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(6,3,'artworkwhatisthis','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','gif picture','ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json',NULL,1,'2020-01-01 00:00:00','2023-06-14 11:49:10',0),(7,4,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(8,5,'artworktest2','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','test2',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(9,1,'artwork modified','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','artwork modify testing',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(12,3,'ds','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(26,3,'ds2','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','sdfdsf',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(27,9,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(29,10,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(31,11,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(32,12,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(33,13,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(35,14,'artworktest14','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','test1',NULL,NULL,0,'2020-01-01 00:00:00','2020-01-01 00:00:00',0),(36,1,'artworktest1changed','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin','desctest1changed',NULL,'extratest1changed',0,'2023-01-01 00:00:00','2026-12-31 00:00:00',0),(37,1,'artworktest909','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','undefined','desctest1',NULL,'extratest1',0,'2021-01-01 00:00:00','2025-12-31 00:00:00',0),(38,1,'artworktest9','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','desctest1',NULL,'extratest1',0,'2021-01-01 00:00:00','2025-12-31 00:00:00',0),(39,1,'artworktest8','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','desctest1',NULL,'extratest1',0,'2021-01-01 00:00:00','2025-12-31 00:00:00',0),(40,1,'artworktest7','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','desctest1',NULL,'extratest1',0,'2021-01-01 00:00:00','2023-06-16 00:02:30',1),(41,1,'artworktest97','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','desctest1',NULL,'extratest1',0,'2021-01-01 00:00:00','2025-12-31 00:00:00',0),(42,32,'artworktest1','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork1.jpeg','fish','destest1','ipfs://bafyreigk2u5dccnqwnuqfqhr2wendm3fsbose2fv3wqsneoibwpybt3n34/metadata.json','extratest1',0,'2023-06-01 00:00:00','2023-06-26 15:26:53',0),(43,32,'artworktest','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork5.jpeg','fish','destest','ipfs://bafyreien2ob5fwgk4hfgsrkx2s2ew3wvm66lq7bm4liaxuiyibibcm7qey/metadata.json','extratest',0,'2023-06-01 00:00:00','2023-06-26 15:32:27',0),(44,32,'artworktest2','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork2.jpeg','fish','destest22222',NULL,'extratest22222',0,'2023-06-01 00:00:00','2023-06-06 17:07:20',0),(45,32,'artworktest3','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish','kkkk','ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json','fdsfsfdsfds',0,'2023-06-01 00:00:00','2023-06-27 03:07:23',1),(46,32,'artworktest4','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork4.jpeg','fish','destest5',NULL,'extratest5',0,'2023-06-01 00:00:00','2023-06-26 15:22:11',0),(47,32,'artworktest5','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork3.jpeg','whale','fuck',NULL,'extratest1',0,'2021-01-01 00:00:00','2023-06-15 16:17:46',0),(48,32,'artworknew7','http://artworktestnew2','whale','desctest1',NULL,'extratest1',1,'2021-01-01 00:00:00','2023-06-16 00:01:33',1),(49,33,'sample-test','http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','Sample test','ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json','Sample test extra',0,'2023-06-28 00:00:00','2023-06-28 15:46:59',1);
/*!40000 ALTER TABLE `artwork` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CMSUser`
--

DROP TABLE IF EXISTS `CMSUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CMSUser` (
  `CMSUserId` int NOT NULL AUTO_INCREMENT COMMENT 'ID for credential',
  `name` varchar(100) NOT NULL,
  `credential` varchar(100) NOT NULL COMMENT 'User password in md5',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the account is administrator',
  `isActive` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'If the account is active',
  PRIMARY KEY (`CMSUserId`),
  UNIQUE KEY `CMSUserId_UNIQUE` (`CMSUserId`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CMSUser`
--

LOCK TABLES `CMSUser` WRITE;
/*!40000 ALTER TABLE `CMSUser` DISABLE KEYS */;
INSERT INTO `CMSUser` VALUES (1,'admin','c93ccd78b2076528346216b3b2f701e6',1,1);
/*!40000 ALTER TABLE `CMSUser` ENABLE KEYS */;
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
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`eventId`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'eventD','eventD description','http://www.abc.com/a.png','http://www.abc.com/eventD.html','timerDescriptionD','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(2,'eventK','eventK description','http://www.abc.com/b.png','http://www.abc.com/eventK.html','timerDescriptionK','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(3,'eventC','eventC description','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10',1),(4,'eventA','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10',1),(5,'eventB','eventB description','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(6,'eventE','eventC description','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10',1),(7,'eventF','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10',1),(8,'eventG','eventB description','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(9,'eventH','eventC description','http://127.0.0.1:3000/GettyImages-1300384940-2000-a5979552a66f4fc7b67aeb35110fea8d%20copy.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10',1),(10,'eventI','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10',1),(12,'event99','eventK description','http://www.abc.com/k.png','http://www.abc.com/eventK.html','timerDescriptionK','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(13,'event9','eventB description','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(14,'event8','eventC description','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','2023-06-09 09:00:10','2023-10-09 09:00:10',0),(15,'event7','eventD description','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','2024-06-09 09:00:10','2024-10-09 09:00:10',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joinedEvent`
--

LOCK TABLES `joinedEvent` WRITE;
/*!40000 ALTER TABLE `joinedEvent` DISABLE KEYS */;
INSERT INTO `joinedEvent` VALUES (1,1,8),(2,3,4),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,3,7),(8,3,8),(9,3,9),(10,4,6),(11,5,7),(12,5,8),(13,9,1),(14,9,2),(15,9,3),(16,9,1),(17,9,2),(18,9,3),(19,10,1),(20,10,2),(21,10,3),(22,9,1),(23,9,2),(24,9,3),(25,9,1),(26,9,2),(27,9,3);
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
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`websiteId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalWebsite`
--

LOCK TABLES `personalWebsite` WRITE;
/*!40000 ALTER TABLE `personalWebsite` DISABLE KEYS */;
INSERT INTO `personalWebsite` VALUES (1,1,'https://abc.com','desc1',1),(2,1,'https://def.com','desc2',1),(3,1,'https://ghi.com','desc3',1),(4,2,'https://123.com','show1',1),(5,2,'https://456.com','show2',1),(6,2,'https://789.com','show3',1),(7,3,'https://111.com','detail1',1),(8,3,'https://222.com','detail2',1),(9,1,'https://modifiedwebsite.com','personalwebsite modify testing',1),(10,4,'https://1.com','new 1',1),(11,5,'https://2.com','new 2',1),(12,5,'https://3.com','new 3',1),(13,4,'https://1.com','new 1',1),(14,5,'https://2.com','new 2',1),(15,6,'https://3.com','new 3',1),(16,1,'https://77.com','new 77',1),(17,1,'https://88.com','new 88',1),(18,1,'https://99.com','new 99',1),(19,33,'https://abc.com','shit',0),(20,1,'https://modified.com','personalwebsite modify testing',1),(21,33,'undefined','undefined',0),(22,1,'https://modifiedactive.com','personalwebsite modify testing',1),(23,1,'https://modifiedactive.com','personalwebsite modify testing',1),(24,32,'undefined','undefined',0),(25,33,'https://www.abc.com.xyz','fdsfdsfdsf',1),(26,1,'https://missav.com','personalwebsite modify testing',1),(27,1,'https://missav.com','personalwebsite modify testing',1),(28,1,'https://amissav.com','fuck1',1),(29,1,'https://amissav.com','fuck1',1),(30,1,'https://amissav.com','fuck1',1),(31,1,'https://amissav.com','fuck1',1),(32,32,'undefined','undefined',0),(33,32,'undefined','undefined',0),(34,32,'undefined','undefined',0),(35,32,'undefined','undefined',0),(36,32,'undefined','undefined',0),(37,32,'undefined','undefined',0),(38,32,'undefined','undefined',0),(39,32,'http://www.abc.com','123',1);
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
  `appleId` varchar(50) NOT NULL COMMENT 'Apple ID',
  `walletAddress` varchar(45) DEFAULT NULL COMMENT 'Crypto wallet address',
  `personInfo` varchar(1000) DEFAULT NULL,
  `createTime` datetime NOT NULL COMMENT 'Record create time',
  `updateTime` datetime NOT NULL COMMENT 'Record update time',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `refreshToken` varchar(80) DEFAULT NULL,
  `validToken` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `twitterId_UNIQUE` (`appleId`),
  UNIQUE KEY `walletAddress_UNIQUE` (`walletAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','0xbA87C344Aea90A5ad73b197b34dB2DfBa66398F9','This is a modified msg2','2024-05-17 01:01:01','2023-06-21 15:47:42',1,'Edward','Tam','edwardt@animocabrands.com','abc',1),(2,'you@apple.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA9a','free text for editing','2023-01-02 10:00:00','2023-01-31 01:00:00',1,NULL,NULL,NULL,NULL,1),(3,'we@apple.com','0x1BC91e17a84D65d750aB671Fc1D2038a42A69948','say something about you','2023-02-28 00:00:00','2023-03-20 00:00:00',1,NULL,NULL,NULL,NULL,1),(4,'xx@xx.com','0xbA87C344Aea90A5ad73b197b34dB2DfBa66398Fd','This is a modified msg','2024-05-17 01:01:01','2025-06-17 02:02:02',0,NULL,NULL,NULL,NULL,1),(5,'yy@yy.com','0x54B6Acc64bf7A7cf7450a2C3025c29dC71974c1E','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(6,'zz@zz.com','0xef4cF75b222c45C89D315Ba1781C85E81D0F2832','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(19,'11@xx.com','0xbecA25F68fa00ed5e86B7F00ADa2A06254f47C01','This is a about me','2018-05-17 01:01:01','2019-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(20,'22@yy.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA92','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(21,'33@zz.com','0x971DBc24d5D230eBd3D9EB7D7E2Ba9a9d7Ba8683','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(28,'123@xx.com','0x1ecA25F68fa00ed5e86B7F00ADa2A06254f47C01','This is a about me','2018-05-17 01:01:01','2019-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(29,'456@yy.com','0x28a729C23c4304597ec10894A374fdD44Da5bA92','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',0,NULL,NULL,NULL,NULL,1),(30,'789@zz.com','0x371DBc24d5D230eBd3D9EB7D7E2Ba9a9d7Ba8683','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(32,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808',NULL,NULL,'2023-04-27 23:25:23','2023-04-27 23:26:04',1,'Edward','Tam','vyj8xydrdq@privaterelay.appleid.com','r9ef10454db71489dabf003202a42de1c.0.szyu.xFPH6UMhZk-tnSs0ib_wWw',1),(33,'001972.4d3f31545cc74f09acd0a6799569a95e.0333',NULL,'abcdefg','2023-05-12 23:45:18','2023-06-26 09:14:36',1,'Edward','Tam','s8rrdfmfrc@privaterelay.appleid.com','r4e3ea17bac8b499783e5b118fee36f72.0.srzxs.l6s9ZLm91C2MhLuMkoICZQ',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walletAddress`
--

DROP TABLE IF EXISTS `walletAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `walletAddress` (
  `walletAddressId` int NOT NULL AUTO_INCREMENT,
  `appleId` varchar(50) NOT NULL COMMENT 'Apple ID',
  `walletAddress` varchar(45) NOT NULL COMMENT 'Wallet Address',
  `createTime` datetime NOT NULL COMMENT 'Creation Time',
  `updateTime` datetime NOT NULL COMMENT 'Update Time',
  PRIMARY KEY (`walletAddressId`),
  UNIQUE KEY `index2` (`walletAddressId`,`appleId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walletAddress`
--

LOCK TABLES `walletAddress` WRITE;
/*!40000 ALTER TABLE `walletAddress` DISABLE KEYS */;
INSERT INTO `walletAddress` VALUES (1,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808','0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab','2023-06-12 00:06:07','2023-06-12 00:06:26'),(2,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab','2023-06-12 00:06:07','2023-06-12 00:06:07'),(3,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9','2023-06-12 00:06:07','2023-06-12 00:06:07'),(13,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x54B6Acc64bf7A7cf7450a2C3025c29dC71974c1E','2023-06-26 09:22:14','2023-06-26 09:22:14'),(14,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x6Bf589b61ceF72080A620660F0cD2b442174f2Cf','2023-06-26 09:22:46','2023-06-26 15:18:55'),(15,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab','2023-06-26 15:30:59','2023-06-26 15:31:36'),(16,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9','2023-06-26 15:39:56','2023-06-27 23:33:37'),(17,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808','0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9','2023-06-26 15:56:25','2023-06-26 18:25:57'),(18,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x5248099D624063a83fa37f22f8243A80e56D5138','2023-06-28 09:22:04','2023-06-28 16:57:00');
/*!40000 ALTER TABLE `walletAddress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 18:08:55
