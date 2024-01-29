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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appVersion`
--

LOCK TABLES `appVersion` WRITE;
/*!40000 ALTER TABLE `appVersion` DISABLE KEYS */;
INSERT INTO `appVersion` VALUES (1,'0.0.1','initial version','2023-02-17 00:00:00','2023-03-10 00:00:00','1st version',1),(2,'0.0.3','MVP version','2023-04-01 00:00:00','2023-04-30 00:00:00','3rd version',1),(4,'0.0.2','2nd version','2023-03-02 00:00:00','2023-04-01 00:00:00','2nd version',1),(5,'0.0.4','4th version','2023-05-17 01:01:01','2023-06-17 02:02:02','4th',1),(6,'0.0.5','5th version','2023-06-17 03:03:03','2023-07-17 04:04:04','5th',1),(7,'0.0.6','6th edited version','2024-01-01 00:00:00','2024-01-01 00:00:01','edited version testing',0),(17,'0.0.12','12th version','2023-05-17 01:01:01','2023-06-17 02:02:02','undefined',1),(18,'0.0.13','13th version','2023-06-17 03:03:03','2023-07-17 04:04:04','undefined',1),(19,'0.0.14','98th version','2023-08-17 05:05:09','2023-09-02 07:06:06','something here',1),(31,'0.0.99','99th version','2023-05-17 01:01:01','2023-06-17 02:02:02','undefined',1),(33,'1','1','2023-04-04 08:02:06','2023-04-04 08:02:14','undefined',1),(36,'0.0009','9thth','2023-04-06 02:25:23','2023-04-27 02:25:27','tests9',0),(37,'2','2','2023-04-04 08:02:06','2023-04-04 08:02:14','undefined',1),(38,'3','3','2023-04-04 08:02:06','2023-04-04 08:02:14','undefined',1),(39,'4','4','2023-04-04 08:02:06','2023-04-04 08:02:14','undefined',1),(40,'5','5','2023-04-04 08:02:06','2023-04-04 08:02:14','undefined',1),(42,'9','9','2023-04-04 08:02:06','2023-04-04 08:02:14','1',1),(46,'13','13','2023-04-04 08:02:06','2023-04-04 08:02:14','1',1),(47,'14','14','2023-04-04 08:02:06','2023-04-04 08:02:14','1',1),(48,'15','15','2023-04-04 08:02:06','2023-04-04 08:02:14','1',1),(49,'22','22','2023-04-04 08:02:06','2023-04-04 08:02:14','1',1),(50,'23','23','2023-04-04 08:02:06','2023-04-04 08:02:14','1',1),(52,'24','24','2023-04-04 08:02:13','2024-02-01 08:02:21','1',1);
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
  `eventId` int NOT NULL DEFAULT '0',
  `URL` varchar(500) NOT NULL COMMENT 'URL of the upload artwork',
  `type` varchar(50) NOT NULL DEFAULT 'fish',
  `artistMessage` varchar(5000) DEFAULT NULL,
  `extraInfo` varchar(500) DEFAULT NULL,
  `mintpassStorage` varchar(100) DEFAULT NULL COMMENT 'URI for NFT Storage (Mintpass)',
  `mindfultokenStorage` varchar(100) DEFAULT NULL COMMENT 'URI for NFT Storage (Mindfultoken)',
  `ifHomepage` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the artwork is to displayed on the homepage, default is 0',
  `ifMinted` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the artwork is minted for mintPass',
  `ifRedeemed` tinyint(1) NOT NULL DEFAULT '0',
  `authenticScarcity` int DEFAULT NULL,
  `scarcityRank` int DEFAULT NULL,
  `clusterId` int DEFAULT NULL,
  `clusterSize` int DEFAULT NULL,
  `superClusterId` int DEFAULT NULL,
  `superClusterSize` int DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00',
  `updateTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00',
  PRIMARY KEY (`artworkId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,59,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-11-01 at 5.26.33 PM.jpg','butterflyfish','AM20240115-1',NULL,'ipfs://bafyreidrpl5gtcxdseoqojmtp7nsjspofchpeapmtyas23afwe72lixvi4/metadata.json','ipfs://bafyreidco5hci66h6wpcc2mchlnwni56yels6zdugoxffqqpf36lefbn7u/metadata.json',1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-15 16:36:28','2024-01-15 16:38:55'),(2,59,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-11-01 at 5.26.33 PM.jpg','bluemarlin','AM20240115-2',NULL,'ipfs://bafyreidhgnljib3sljjx75yj5exqmo6iooqpejndfdtnlnsdghae64uob4/metadata.json','ipfs://bafyreibsix7cuz2kk6leycf4lzxo2wfutxe3cbumqjrahdfxrnmdbqhjsm/metadata.json',1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-15 16:53:57','2024-01-15 16:55:23'),(3,59,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-11-01 at 5.26.33 PM.jpg','butterflyfish','AM20240115-4',NULL,'ipfs://bafyreidak2ho4gtnn5tdf6x34x2536xo7jvscplavpj6zf52hloudnpyqq/metadata.json','ipfs://bafyreienawj6kmfijovtowpryjpxqjvqrtxgtec6hjupoalv5e3ly2ntxa/metadata.json',1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-15 17:19:36','2024-01-15 17:21:42'),(4,59,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2024-01-03 at 11.57.24 AM.jpg','bluemarlin','AM20240115-5',NULL,'ipfs://bafyreibtmpgpgmto4yv4ui6gx4urhccblvqgf77jtpwldrb3ch7n46i5ja/metadata.json','ipfs://bafyreiac5hjqlqg33vmc2oip4jlca5m4mfgqtfmgnvhjwopevdtiemtobi/metadata.json',1,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-15 17:35:27','2024-01-15 17:37:39'),(5,59,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-11-01 at 5.26.33 PM.jpg','butterflyfish','AM20240117-1',NULL,'ipfs://bafyreidwlvznpb57ab4dhmj6cxxz3iincoau63bdyyd7rrlo6f6sajfinq/metadata.json','ipfs://bafyreiecid26shxy7edun4txcjzflvpellpd4qga6tsymzqid6obj6k62q/metadata.json',0,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-17 18:00:46','2024-01-17 18:04:09'),(6,59,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2024-01-18 at 1.54.41 PM.jpg','butterflyfish','am',NULL,'ipfs://bafyreif4qfups33g42ulb2rbfpdmokih7yojf3heivoshpjcxi4ncvejy4/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-19 01:58:17','2024-01-19 01:58:46'),(7,59,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-11-01 at 5.26.33 PM.jpg','bluemarlin','bm01am',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-25 17:15:31','2024-01-25 17:15:31'),(8,59,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-10-17 at 11.36.00 AM.jpg','bluemarlin','AM20240126',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-26 11:53:22','2024-01-26 11:53:22'),(9,59,2,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2024-01-22 at 3.20.04 PM.jpg','butterflyfish','AM20240126-10',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2024-01-26 11:56:49','2024-01-26 11:56:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CMSUser`
--

LOCK TABLES `CMSUser` WRITE;
/*!40000 ALTER TABLE `CMSUser` DISABLE KEYS */;
INSERT INTO `CMSUser` VALUES (1,'admin','b9224e93cfb0e787826ae01973e47c2a',1,1),(2,'mindful','6b8be545345a069e9eff5fe625db791b',1,1);
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
  `titleCN` varchar(500) DEFAULT NULL,
  `titleTW` varchar(500) DEFAULT NULL,
  `paragraphText` varchar(2000) NOT NULL COMMENT 'Paragraph text of the event',
  `paragraphTextCN` varchar(2000) DEFAULT NULL,
  `paragraphTextTW` varchar(2000) DEFAULT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'fish' COMMENT 'Fish type for this event',
  `image` varchar(200) DEFAULT NULL COMMENT 'URL of the event image',
  `hyperlink` varchar(200) DEFAULT NULL COMMENT 'Hyperlink providing more description of the event',
  `timerDescription` varchar(2000) DEFAULT NULL COMMENT 'Description of the timer',
  `timerDescriptionCN` varchar(2000) DEFAULT NULL,
  `timerDescriptionTW` varchar(2000) DEFAULT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`eventId`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  UNIQUE KEY `titleCN_UNIQUE` (`titleCN`),
  UNIQUE KEY `titleTW_UNIQUE` (`titleTW`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'eventD','eventD','eventD','eventD description','','','fish','http://www.abc.com/a.png','http://www.abc.com/eventD.html','timerDescriptionD','','','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(2,'eventK','eventK','eventK','eventK description',NULL,NULL,'fish','http://www.abc.com/b.png','http://www.abc.com/eventK.html','timerDescriptionK',NULL,NULL,'2022-06-09 09:00:10','2022-10-09 09:00:10',0),(3,'eventC','eventC','eventC','eventC description','','','fish','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','','','2023-06-09 09:00:10','2023-10-09 09:00:10',0),(4,'eventA','eventA','eventA','eventD description','','','fish','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','','','2024-06-09 09:00:10','2024-10-09 09:00:10',0),(5,'eventB','eventB','eventB','eventB description','','','fish','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','','','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(6,'eventE','eventE','eventE','eventC description','','','fish','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','','','2023-06-09 09:00:10','2023-10-09 09:00:10',0),(7,'eventF','eventF','eventF','eventD description','','','fish','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','','','2024-06-09 09:00:10','2024-10-09 09:00:10',0),(8,'eventG','eventG','eventG','eventB description','','','fish','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','','','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(9,'eventH','eventH','eventH','eventC description','','','fish','http://127.0.0.1:3000/GettyImages-1300384940-2000-a5979552a66f4fc7b67aeb35110fea8d%20copy.png','http://www.abc.com/eventC.html','timerDescriptionC','','','2023-06-09 09:00:10','2023-10-09 09:00:10',0),(10,'eventI','eventI','eventI','eventD description','','','fish','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','','','2024-06-09 09:00:10','2024-10-09 09:00:10',0),(12,'event84','event84简体','event84繁體','eventK description','eventK description简体','eventK description繁體','TangFish','http://www.abc.com/k.png','http://www.abc.com/eventK.html','timerDescriptionK','timerDescriptionK简体','timerDescriptionK繁體','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(13,'event9','event9','event9','eventB description','','','fish','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','','','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(14,'event8','event8','event8','eventC description',NULL,NULL,'fish','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC',NULL,NULL,'2023-06-09 09:00:10','2023-10-09 09:00:10',0),(15,'event7','event7','event7','eventD description','','','fish','http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD','','','2024-06-09 09:00:10','2024-10-09 09:00:10',0),(16,'event11','event11简体','event11繁体','event11 description','event11 description简体','event11 description繁体','fish','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','timerDescriptionB简体','timerDescriptionB繁体','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(17,'event12','event12简体','event12繁体','event12 description','event12 description简体','event12 description繁体','fish','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','timerDescriptionC简体','timerDescriptionC繁体','2023-06-09 09:00:10','2023-10-09 09:00:10',0),(24,'event70','event70简体','event70繁体','event11 description','event11 description简体','event11 description繁体','fish','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','timerDescriptionB简体','timerDescriptionB繁体','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(25,'event71','event72简体','event72繁体','event12 description','event12 description简体','event12 description繁体','fish','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','timerDescriptionC简体','timerDescriptionC繁体','2023-06-09 09:00:10','2023-10-31 09:00:10',1),(26,'event0','event0CN','event0TW','event0Text','event0TextCN','event0TextTW','fish','http://www.abc.com/c.png','http://www.abc.com/event0.html','timerDescription0','timerDescription0CN','timerDescription0tw','2023-06-09 09:00:10','2023-06-09 09:00:10',1),(31,'event74','event74简体','event74繁体','event11 description','event11 description简体','event11 description繁体','TangFish','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','timerDescriptionB简体','timerDescriptionB繁体','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(32,'event75','event75简体','event75繁体','event12 description','event12 description简体','event12 description繁体','Dolphin','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','timerDescriptionC简体','timerDescriptionC繁体','2023-06-09 09:00:10','2023-10-09 09:00:10',0),(33,'titlefish','titlefishCN','titlefishTW','a','b','c','aaafish','https://s.yimg.com/ny/api/res/1.2/NTcfcDUuBZ.l8dOCHUIc3g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTUxMDtjZj13ZWJw/https://media.zenfs.com/en/bossmind_356/093fc179bd9a1dd75758ada3ee164c41','https://abc.com','e','f','g','2024-01-17 14:43:02','2024-01-18 14:43:06',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joinedEvent`
--

LOCK TABLES `joinedEvent` WRITE;
/*!40000 ALTER TABLE `joinedEvent` DISABLE KEYS */;
INSERT INTO `joinedEvent` VALUES (1,1,8),(2,3,4),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,3,7),(8,3,8),(9,3,9),(10,4,6),(11,5,7),(12,5,8),(13,9,1),(14,9,2),(15,9,3),(16,9,1),(17,9,2),(18,9,3),(19,10,1),(20,10,2),(21,10,3),(22,9,1),(23,9,2),(24,9,3),(25,9,1),(26,9,2),(27,9,3),(28,9,1),(29,9,2),(30,9,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalWebsite`
--

LOCK TABLES `personalWebsite` WRITE;
/*!40000 ALTER TABLE `personalWebsite` DISABLE KEYS */;
INSERT INTO `personalWebsite` VALUES (1,1,'https://abc.com','desc1',1),(2,1,'https://def.com','desc2',1),(3,1,'https://ghi.com','desc3',1),(4,2,'https://123.com','show1',1),(5,2,'https://456.com','show2',1),(6,2,'https://789.com','show3',1),(7,3,'https://111.com','detail1',1),(8,3,'https://222.com','detail2',1),(9,1,'https://modifiedwebsite.com','personalwebsite modify testing',1),(10,4,'https://1.com','new 1',1),(11,5,'https://2.com','new 2',1),(12,5,'https://3.com','new 3',1),(13,4,'https://1.com','new 1',1),(14,5,'https://2.com','new 2',1),(15,6,'https://3.com','new 3',1),(16,1,'https://77.com','new 77',1),(17,1,'https://88.com','new 88',1),(18,1,'https://99.com','new 99',1),(19,33,'https://abc.com','personalwebsite modify testing',0),(20,1,'https://modified.com','personalwebsite modify testing',1),(21,33,'undefined','undefined',0),(22,1,'https://modifiedactive.com','personalwebsite modify testing',1),(23,1,'https://modifiedactive.com','personalwebsite modify testing',1),(24,32,'undefined','undefined',0),(25,33,'https://abc.com','fdsfdsfdsf',1),(26,1,'https://missav.com','personalwebsite modify testing',1),(27,1,'https://missav.com','personalwebsite modify testing',1),(28,1,'https://amissav.com','fuck1',1),(29,1,'https://amissav.com','fuck1',1),(30,1,'https://amissav.com','fuck1',1),(31,1,'https://amissav.com','fuck1',1),(32,32,'undefined','undefined',0),(33,32,'undefined','undefined',0),(34,32,'undefined','undefined',0),(35,32,'undefined','undefined',0),(36,32,'undefined','undefined',0),(37,32,'undefined','undefined',0),(38,32,'undefined','undefined',0),(39,32,'http://www.abc.com','123',1),(40,1,'https://modifiedactive.com','personalwebsite modify testing',1),(41,1,'https://modifiedactive.com','personalwebsite modify testing',1),(42,1,'https://modifiedactive.com','personalwebsite modify testing',1);
/*!40000 ALTER TABLE `personalWebsite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TandC`
--

DROP TABLE IF EXISTS `TandC`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TandC` (
  `TandCId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `agreed` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'if user agreed T&C',
  `createTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT 'record create time',
  `updateTime` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT 'record update time',
  PRIMARY KEY (`TandCId`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TandC`
--

LOCK TABLES `TandC` WRITE;
/*!40000 ALTER TABLE `TandC` DISABLE KEYS */;
INSERT INTO `TandC` VALUES (1,1,1,'2023-10-11 00:00:00','2023-10-11 11:38:33'),(2,32,1,'2023-10-11 00:39:19','2023-10-11 00:41:05'),(3,33,1,'2023-10-11 11:38:58','2023-10-11 11:38:58'),(4,56,1,'2023-11-29 14:22:53','2023-11-29 14:34:01'),(5,57,1,'2023-12-28 17:55:31','2023-12-28 17:55:31'),(6,58,1,'2023-12-29 17:48:09','2023-12-29 17:48:09'),(7,59,1,'2023-12-29 18:08:10','2024-01-05 23:40:31');
/*!40000 ALTER TABLE `TandC` ENABLE KEYS */;
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
  `verificationToken` varchar(32) DEFAULT NULL COMMENT 'Email verification token sent to user',
  `vtTime` datetime DEFAULT NULL COMMENT 'Verification Token update time',
  `emailVerified` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the email is verified',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `twitterId_UNIQUE` (`appleId`),
  UNIQUE KEY `verificationToken_UNIQUE` (`verificationToken`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','modified A','fuck you man','2024-05-17 01:01:01','2023-09-06 11:38:23',0,'Edward','Tam','s8rrdfmfrc@privaterelay.appleid.com','modified F',1,'HWO5CV53W5M6M76R790OV81GOVVPPEOD','2023-12-12 23:40:18',1),(2,'you@apple.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA9a','free text for editing','2023-01-02 10:00:00','2023-01-31 01:00:00',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(3,'we@apple.com','0x1BC91e17a84D65d750aB671Fc1D2038a42A69948','say something about you','2023-02-28 00:00:00','2023-03-20 00:00:00',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(4,'xx@xx.com','0xbA87C344Aea90A5ad73b197b34dB2DfBa66398Fd','This is a modified msg','2024-05-17 01:01:01','2025-06-17 02:02:02',0,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(5,'yy@yy.com','0x54B6Acc64bf7A7cf7450a2C3025c29dC71974c1E','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(6,'zz@zz.com','0xef4cF75b222c45C89D315Ba1781C85E81D0F2832','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(19,'11@xx.com','0xbecA25F68fa00ed5e86B7F00ADa2A06254f47C01','This is a about me','2018-05-17 01:01:01','2019-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(20,'22@yy.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA92','This is a about him','2020-05-17 01:01:01','2024-01-11 12:37:35',0,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(21,'33@zz.com','0x971DBc24d5D230eBd3D9EB7D7E2Ba9a9d7Ba8683','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(28,'123@xx.com','0x1ecA25F68fa00ed5e86B7F00ADa2A06254f47C01','This is a about me','2018-05-17 01:01:01','2019-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(29,'456@yy.com','0x28a729C23c4304597ec10894A374fdD44Da5bA92','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',0,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(30,'789@zz.com','0x371DBc24d5D230eBd3D9EB7D7E2Ba9a9d7Ba8683','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1,NULL,NULL,0),(32,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808',NULL,NULL,'2023-04-27 23:25:23','2023-04-27 23:26:04',1,'Edward','Tam','vyj8xydrdq@privaterelay.appleid.com','r9ef10454db71489dabf003202a42de1c.0.szyu.xFPH6UMhZk-tnSs0ib_wWw',1,NULL,NULL,0),(33,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','','how about this','2023-05-12 23:45:18','2024-01-11 12:42:55',1,'Edward','Tam','s8rrdfmfrc@privaterelay.appleid.com','r4e3ea17bac8b499783e5b118fee36f72.0.srzxs.l6s9ZLm91C2MhLuMkoICZQ',1,'EGD3UT1SUMP4B00KWJBYJO8B7U2V0304',NULL,0),(59,'001972.c7c33c51e40d4c239a38cc22e4c1244f.0850','','','2023-12-29 18:06:58','2024-01-15 13:16:58',1,'Edward','Tam','kkkkalias@yahoo.com.hk','r32c40bb09af3449db5cd8f6de16824ae.0.rrzxs.xFYrYRlxAKrhoQTNxItbDg',1,'SO980XMSKAKA5B1ONRYS4BWARFHAATDF',NULL,1);
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
  UNIQUE KEY `index2` (`walletAddressId`,`appleId`),
  UNIQUE KEY `walletAddress_UNIQUE` (`walletAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walletAddress`
--

LOCK TABLES `walletAddress` WRITE;
/*!40000 ALTER TABLE `walletAddress` DISABLE KEYS */;
INSERT INTO `walletAddress` VALUES (28,'001972.c7c33c51e40d4c239a38cc22e4c1244f.0850','0x1a4157D4129908EDF31aa34164aD01b1F0AAd016','2023-11-27 17:00:43','2023-12-29 15:51:33'),(29,'001972.c7c33c51e40d4c239a38cc22e4c1244f.0850','0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9','2023-11-27 17:36:35','2024-01-26 11:57:00'),(30,'001972.c7c33c51e40d4c239a38cc22e4c1244f.0850','0xeE3236c785378a1b384a47070BD8671bF9c7a937','2024-01-22 17:06:05','2024-01-24 11:36:25'),(31,'001972.c7c33c51e40d4c239a38cc22e4c1244f.0850','0xF52BF334A879Aae7D86Ce3a89b3Bf2c6A2d24946','2024-01-24 11:34:26','2024-01-24 11:34:33');
/*!40000 ALTER TABLE `walletAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mindful'
--

--
-- Dumping routines for database 'mindful'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-29 13:56:06
