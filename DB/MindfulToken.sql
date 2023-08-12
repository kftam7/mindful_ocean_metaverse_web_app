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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','AM','extratest1','ipfs://bafyreiguo2o4xxtla24nftaab5ykpjoocsehs22456t67ljesbsl7eruja/metadata.json','ipfs://bafyreiguhglvngrtq5e7ekuvoekewez3w2pxnobtfj7htqmishpgmotazy/metadata.json',1,1,1,1,2,3,4,5,6,1,'2021-01-01 00:00:00','2023-08-12 13:53:59'),(2,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale','msg1','extra','ipfs://bafyreieh4lvmzx5z6zqq7ipgtipozrjbbrzt6cawf2aux4u755mgmjdvxu/metadata.json','ipfs://bafyreic3uslhgjubhnidlcgzw2euhu5hrbauvqizmznxgnvvr7egtyhq5q/metadata.json',0,1,1,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2023-08-03 01:27:04'),(3,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(4,2,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,NULL,'ipfs://bafyreieywdrm3dm6cj7ejbgaofk36wuyck2ohovklg6nfq75v5o3wvmjby/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(5,2,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,NULL,'ipfs://bafyreidahw33qr6resa6a3mrsff2h5743fkhwg6gk73zqjlmzhj7q4slr4/metadata.json','ipfs://bafyreiarperofsijrxp5bk7gx7pwdnxclrbk4v5rojniui747tqqz4md7q/metadata.json',1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2023-07-06 09:25:49'),(6,3,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,NULL,'ipfs://bafyreifm457a6j647vd4b7g6oqwkyxvgzegpfwsg3hvd6wf6rk2ukhk7gq/metadata.json',NULL,1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2023-06-14 11:49:10'),(7,4,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(8,5,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(9,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,NULL,NULL,NULL,1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(12,3,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(26,3,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,NULL,NULL,NULL,1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(27,9,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(29,10,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,NULL,NULL,NULL,1,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(31,11,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(32,12,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(33,13,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(35,14,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2020-01-01 00:00:00','2020-01-01 00:00:00'),(36,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','dolphin',NULL,'extratest1changed',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-01-01 00:00:00','2026-12-31 00:00:00'),(37,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','undefined',NULL,'extratest1',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2025-12-31 00:00:00'),(38,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,'extratest1',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2025-12-31 00:00:00'),(39,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,'extratest1',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2025-12-31 00:00:00'),(40,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,'extratest1',NULL,NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-06-16 00:02:30'),(41,1,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','whale',NULL,'extratest1',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2025-12-31 00:00:00'),(42,32,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork1.jpeg','fish',NULL,'extratest1','ipfs://bafyreigk2u5dccnqwnuqfqhr2wendm3fsbose2fv3wqsneoibwpybt3n34/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-01 00:00:00','2023-06-26 15:26:53'),(43,32,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork5.jpeg','fish',NULL,'extratest','ipfs://bafyreien2ob5fwgk4hfgsrkx2s2ew3wvm66lq7bm4liaxuiyibibcm7qey/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-01 00:00:00','2023-06-26 15:32:27'),(44,32,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork2.jpeg','fish',NULL,'extratest22222',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-01 00:00:00','2023-06-06 17:07:20'),(45,32,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,'fdsfsfdsfds','ipfs://bafyreibmfsnqc55ziv7vck6b4f76ifixu67bxpwcsk5zg5o27lnesv6pqe/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-01 00:00:00','2023-06-27 03:07:23'),(46,32,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork4.jpeg','fish',NULL,'extratest5',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-01 00:00:00','2023-06-26 15:22:11'),(47,32,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork3.jpeg','whale',NULL,'extratest1',NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-06-15 16:17:46'),(48,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normal','extra',NULL,NULL,0,0,0,100,100,100,100,100,100,1,'2021-01-01 00:00:00','2023-08-11 17:43:23'),(49,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck','extra','ipfs://bafyreidosepy7vwqdeuceuz5xzzwj4amnfrhqttpr7e45c2jtt3dn45t5e/metadata.json',NULL,0,1,0,100,100,100,100,100,100,1,'2023-06-28 00:00:00','2023-08-02 02:06:32'),(50,33,3,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test9.jpeg','fish2','am ok','extra1','ipfs://bafyreidtwjnodwrfdupwnp65tkvunwihvicmmdnigzgwlcopolbzvmhkcu/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-28 00:00:00','2023-08-11 17:44:09'),(51,33,0,'C:\\fakepath\\event_A.png','fish',NULL,'test artwork extrainfo',NULL,NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-06-15 23:58:42'),(52,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_B.png','fish',NULL,'testartwork2 extra','ipfs://bafyreidaphppcdpnwtrbxy6g42uubwpcxgxo2przkocnqz4tuk7hlxe4g4/metadata.json',NULL,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-04 13:32:51'),(53,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_E.png','fish',NULL,'extra9','ipfs://bafyreifhld4u4sy6osixubpebmc4grdi4y5ghjmyphkkfjyufipxrcivny/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-05 02:25:27'),(54,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/whale.png','fish',NULL,'fish1 extra','ipfs://bafyreibsrmk4nyn3lxvfc6rpqjwcspqubzdsgjvqj257e7k45rd6vw3mey/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-05 12:15:01'),(55,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish',NULL,'Sample test extra','ipfs://bafyreihlwqce37vjh456nn45xkukrv5li3vogqf7ryhb3zsjv2p57shlji/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-28 00:00:00','2023-07-05 17:50:28'),(56,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,'ABL test extrainfo','ipfs://bafyreibvqf5jo6zp6w553bmurplt4ymofliglvd6xgnmvadap7ryz47tee/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-06 09:24:59'),(57,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork.jpeg','fish',NULL,'newartwork1 extrainfo','ipfs://bafyreihp3kuadzs7thjajpm4cxt5eoljadytjaw3r3r4v5y5brmr6h6oai/metadata.json','ipfs://bafyreifexnur5wwigisk5brpaooqpmvrjgs6fnkph2rj7bo6fq7p657fqq/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-06 15:01:04'),(59,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample_artwork2.jpeg','fish',NULL,'testartwork2 extrainfo','ipfs://bafyreib74duyz2kqeik2vpki3lavlpqnr7j6m25ns3usfcmtmefgbw2mu4/metadata.json','ipfs://bafyreibrmpqc6xwa5nanhtlcv5klairefxp7knpsbi4qtoq7tqprrbaroy/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-06 14:43:17'),(60,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/mission1.png','fish',NULL,'artwork2023070701 exra','ipfs://bafyreigknxxbqvpzefpx3sm5io6ld5jxjfjlvlc2jmmdjgepdfpsyiazfy/metadata.json','ipfs://bafyreihywyxjh4a3ftlc7r4ocz5sucwuwoych4pz4rmiwp5vcp4ccwvaa4/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-07 00:56:53'),(61,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_A.png','fish',NULL,'extrainfo','ipfs://bafyreigfsikdc7tqic33rc7guydn7at5jrgy4khdfssnya3k3pqxrkyxam/metadata.json','ipfs://bafyreiaa7rdxj7tb2xrxrehkshgqmhtk7yvtgs6co5zv5ohwinklhujq2a/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-10 14:46:25'),(62,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_B.png','fish',NULL,'test20230710-2 extrainfo','ipfs://bafyreigovomhoxeshzlz4pa4q7gicgnmw5d4nnft2u2vafvmykikt25shu/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-10 14:44:30'),(63,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_C.png','fish',NULL,'test20230710-3 info','ipfs://bafyreifjmdk5bmm5px23k5rwxclfubjmsof6lbpt2frlssolziwlovpgue/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-10 15:46:55'),(64,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_D.png','fish',NULL,'4 info','ipfs://bafyreie7rq7rwyfohxchhrtkwjkns2yhyq66oz5pi6oj5kgncu6k3ybzj4/metadata.json',NULL,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-10 16:01:58'),(65,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/event_E.png','fish',NULL,'5 extra','ipfs://bafyreifozc2cwwv7palyhkb5ka2lng34sth4drxatqrgdvgwopjacsqr7y/metadata.json','ipfs://bafyreiagaxkg3ryqlyapd34cefulgp5lrqq5phytlbokzgkd7nksxhqayy/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2021-01-01 00:00:00','2023-07-10 16:09:12'),(66,33,0,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish',NULL,'fuck fuck','ipfs://bafyreiddfl4gd7shimijmrsrsq4otgfibt2lzp4skx33syocue6bh45wte/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-06-28 00:00:00','2023-07-17 22:47:44'),(68,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(69,1,1,'a','fish','Message',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(70,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:37:37','2023-08-02 00:37:37'),(71,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:37:51','2023-08-02 00:37:51'),(72,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:42:05','2023-08-02 00:42:05'),(73,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:42:33','2023-08-02 00:42:33'),(74,1,1,'a','fish','Message',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(75,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:48:31','2023-08-02 00:48:31'),(76,1,1,'a','fish','Message',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(77,1,1,'a','fish','Message',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(78,1,1,'a','fish','Message',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(79,1,1,'a','fish','Message',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 00:31:08','2023-08-02 00:31:08'),(80,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:21:04','2023-08-02 01:21:04'),(81,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:22:22','2023-08-02 01:22:22'),(82,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:23:09','2023-08-02 01:23:09'),(83,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:24:11','2023-08-02 01:24:11'),(84,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,'ipfs://bafyreicfw5jqg7wxbqwyaob5lohhjtx42bfdgdmsxre46mn7j5itmppeuq/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:24:44','2023-08-10 17:57:12'),(85,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,'ipfs://bafyreic7knrlpp2inwanuak6226jmebjxo6qi5umllwejf5lf7nf2wdhzm/metadata.json','ipfs://bafyreicubwj6fibpiuukkry2pivtqughn2bakchrgjcqtyyd7z5zqw2ldi/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:25:54','2023-08-10 17:49:08'),(86,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,'ipfs://bafyreiaur47wpkes4xq2kgpicuhotco5ikcnami5ds2rvcmihhdgpoa2ea/metadata.json','ipfs://bafyreifv55klckfznbk45mtkrpo4lgl6kji3qjoi42zoufeic225onxvgu/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:25:56','2023-08-10 17:33:14'),(87,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck',NULL,'ipfs://bafyreie2v3msreuuwh6jcblcsgu4fm4wsfiuh6mjldqswx45kiyezigb5m/metadata.json','ipfs://bafyreif5eoxndem4ekpsvs2zlnnthu2jemjnzabjw2uf3ca3zj5suksqbi/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:27:09','2023-08-10 13:09:46'),(88,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','What the fuck - yes',NULL,'ipfs://bafyreif37zvinbauo67nufnxzmxi5cudbh6xuyv42k6sj3xtywewb5mkku/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 01:27:10','2023-08-10 10:11:41'),(89,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normal',NULL,'ipfs://bafyreidf32pbmaz3o2c62gl2tyrj3burzu2svjzgyytbppbgxa5flo3oby/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-02 08:41:06','2023-08-10 10:13:09'),(90,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normal',NULL,'ipfs://bafyreiamls6ootqlm47ziwbvr52nq2xwyr4koqck7wepuzzlan5b5qp54q/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,0,'2023-08-02 08:41:09','2023-08-10 10:10:06'),(91,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normalz','extraz','ipfs://bafyreiesfwxosdjtxojuhgvrcagxrfwlgvbxlw2gbkuxiyv5gh6lsqhuoq/metadata.json','ipfs://bafyreia2qu6rdje6vqnwp6qsw6grtywwwef4ksubu6d5vkpjt2tpg3xg6i/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-08 22:34:00','2023-08-10 01:13:45'),(92,33,3,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/Screenshot 2023-08-08 at 5.05.06 PM.jpg','fish','a1',NULL,'ipfs://bafyreidblrkiv4jrijxjjz2qzzzxizlx3jei2loyi6wdta67gtyhqts3wq/metadata.json','ipfs://bafyreicp6463cv5y2bva74nwbpeduam7np23ixrkr6b2x4tr3nhpjlzjuy/metadata.json',1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-08 22:39:44','2023-08-10 09:38:30'),(93,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normal',NULL,'ipfs://bafyreidbvt4zmtp4y4vjs2477lvy2wasgdmdyar5do53kwt6aajw7yceqi/metadata.json',NULL,0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-11 09:29:41','2023-08-11 12:06:56'),(94,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normal',NULL,'ipfs://bafyreieezqfvflil4rwkd3i5uv4mw2hfxmpcqgpdbiqsjqock5te4jewf4/metadata.json',NULL,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-11 09:30:52','2023-08-11 11:59:42'),(95,33,1,'http://127.0.0.1:3001/mindfulapi/app/artworkfile/sample-test.jpeg','fish','normal',NULL,'ipfs://bafyreiahqc7bi2ni5pbusbvv65a3i7sjh7tr7a24cft2qam5qyy6t5a5sm/metadata.json','ipfs://bafyreihdenvted5h3csalxequ543wwovio6kltwkjfsilvecbwzgukksx4/metadata.json',0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,1,'2023-08-11 09:31:19','2023-08-11 11:57:01');
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
INSERT INTO `CMSUser` VALUES (1,'admin','b9224e93cfb0e787826ae01973e47c2a',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'eventD',NULL,NULL,'eventD description',NULL,NULL,'http://www.abc.com/a.png','http://www.abc.com/eventD.html','timerDescriptionD',NULL,NULL,'2022-06-09 09:00:10','2022-10-09 09:00:10',1),(2,'eventK',NULL,NULL,'eventK description',NULL,NULL,'http://www.abc.com/b.png','http://www.abc.com/eventK.html','timerDescriptionK',NULL,NULL,'2022-06-09 09:00:10','2022-10-09 09:00:10',0),(3,'eventC',NULL,NULL,'eventC description',NULL,NULL,'http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC',NULL,NULL,'2023-06-09 09:00:10','2023-10-09 09:00:10',1),(4,'eventA',NULL,NULL,'eventD description',NULL,NULL,'http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD',NULL,NULL,'2024-06-09 09:00:10','2024-10-09 09:00:10',1),(5,'eventB',NULL,NULL,'eventB description',NULL,NULL,'http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB',NULL,NULL,'2022-06-09 09:00:10','2022-10-09 09:00:10',1),(6,'eventE',NULL,NULL,'eventC description',NULL,NULL,'http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC',NULL,NULL,'2023-06-09 09:00:10','2023-10-09 09:00:10',1),(7,'eventF',NULL,NULL,'eventD description',NULL,NULL,'http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD',NULL,NULL,'2024-06-09 09:00:10','2024-10-09 09:00:10',1),(8,'eventG',NULL,NULL,'eventB description',NULL,NULL,'http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB',NULL,NULL,'2022-06-09 09:00:10','2022-10-09 09:00:10',1),(9,'eventH',NULL,NULL,'eventC description',NULL,NULL,'http://127.0.0.1:3000/GettyImages-1300384940-2000-a5979552a66f4fc7b67aeb35110fea8d%20copy.png','http://www.abc.com/eventC.html','timerDescriptionC',NULL,NULL,'2023-06-09 09:00:10','2023-10-09 09:00:10',1),(10,'eventI',NULL,NULL,'eventD description',NULL,NULL,'http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD',NULL,NULL,'2024-06-09 09:00:10','2024-10-09 09:00:10',1),(12,'event99','event99简体','event99繁體','eventK description','eventK description简体','eventK description繁體','http://www.abc.com/k.png','http://www.abc.com/eventK.html','timerDescriptionK','timerDescriptionK简体','timerDescriptionK繁體','2022-06-09 09:00:10','2022-10-09 09:00:10',0),(13,'event9',NULL,NULL,'eventB description',NULL,NULL,'http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB',NULL,NULL,'2022-06-09 09:00:10','2022-10-09 09:00:10',1),(14,'event8',NULL,NULL,'eventC description',NULL,NULL,'http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC',NULL,NULL,'2023-06-09 09:00:10','2023-10-09 09:00:10',0),(15,'event7',NULL,NULL,'eventD description',NULL,NULL,'http://www.abc.com/d.png','http://www.abc.com/eventD.html','timerDescriptionD',NULL,NULL,'2024-06-09 09:00:10','2024-10-09 09:00:10',1),(16,'event11','event11简体','event11繁体','event11 description','event11 description简体','event11 description繁体','http://www.abc.com/b.png','http://www.abc.com/eventB.html','timerDescriptionB','timerDescriptionB简体','timerDescriptionB繁体','2022-06-09 09:00:10','2022-10-09 09:00:10',1),(17,'event12','event12简体','event12繁体','event12 description','event12 description简体','event12 description繁体','http://www.abc.com/c.png','http://www.abc.com/eventC.html','timerDescriptionC','timerDescriptionC简体','timerDescriptionC繁体','2023-06-09 09:00:10','2023-10-09 09:00:10',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalWebsite`
--

LOCK TABLES `personalWebsite` WRITE;
/*!40000 ALTER TABLE `personalWebsite` DISABLE KEYS */;
INSERT INTO `personalWebsite` VALUES (1,1,'https://abc.com','desc1',1),(2,1,'https://def.com','desc2',1),(3,1,'https://ghi.com','desc3',1),(4,2,'https://123.com','show1',1),(5,2,'https://456.com','show2',1),(6,2,'https://789.com','show3',1),(7,3,'https://111.com','detail1',1),(8,3,'https://222.com','detail2',1),(9,1,'https://modifiedwebsite.com','personalwebsite modify testing',1),(10,4,'https://1.com','new 1',1),(11,5,'https://2.com','new 2',1),(12,5,'https://3.com','new 3',1),(13,4,'https://1.com','new 1',1),(14,5,'https://2.com','new 2',1),(15,6,'https://3.com','new 3',1),(16,1,'https://77.com','new 77',1),(17,1,'https://88.com','new 88',1),(18,1,'https://99.com','new 99',1),(19,33,'http://abc.com','personalwebsite modify testing',0),(20,1,'https://modified.com','personalwebsite modify testing',1),(21,33,'undefined','undefined',0),(22,1,'https://modifiedactive.com','personalwebsite modify testing',1),(23,1,'https://modifiedactive.com','personalwebsite modify testing',1),(24,32,'undefined','undefined',0),(25,33,'https://abc.com','fdsfdsfdsf',1),(26,1,'https://missav.com','personalwebsite modify testing',1),(27,1,'https://missav.com','personalwebsite modify testing',1),(28,1,'https://amissav.com','fuck1',1),(29,1,'https://amissav.com','fuck1',1),(30,1,'https://amissav.com','fuck1',1),(31,1,'https://amissav.com','fuck1',1),(32,32,'undefined','undefined',0),(33,32,'undefined','undefined',0),(34,32,'undefined','undefined',0),(35,32,'undefined','undefined',0),(36,32,'undefined','undefined',0),(37,32,'undefined','undefined',0),(38,32,'undefined','undefined',0),(39,32,'http://www.abc.com','123',1),(40,1,'https://modifiedactive.com','personalwebsite modify testing',1),(41,1,'https://modifiedactive.com','personalwebsite modify testing',1);
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
INSERT INTO `user` VALUES (1,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','modified A','modified B','2024-05-17 01:01:01','2023-08-11 17:43:09',0,'modified C','modified D','modified E','modified F',1),(2,'you@apple.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA9a','free text for editing','2023-01-02 10:00:00','2023-01-31 01:00:00',1,NULL,NULL,NULL,NULL,1),(3,'we@apple.com','0x1BC91e17a84D65d750aB671Fc1D2038a42A69948','say something about you','2023-02-28 00:00:00','2023-03-20 00:00:00',1,NULL,NULL,NULL,NULL,1),(4,'xx@xx.com','0xbA87C344Aea90A5ad73b197b34dB2DfBa66398Fd','This is a modified msg','2024-05-17 01:01:01','2025-06-17 02:02:02',0,NULL,NULL,NULL,NULL,1),(5,'yy@yy.com','0x54B6Acc64bf7A7cf7450a2C3025c29dC71974c1E','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(6,'zz@zz.com','0xef4cF75b222c45C89D315Ba1781C85E81D0F2832','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(19,'11@xx.com','0xbecA25F68fa00ed5e86B7F00ADa2A06254f47C01','This is a about me','2018-05-17 01:01:01','2019-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(20,'22@yy.com','0xC8a729C23c4304597ec10894A374fdD44Da5bA92','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(21,'33@zz.com','0x971DBc24d5D230eBd3D9EB7D7E2Ba9a9d7Ba8683','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(28,'123@xx.com','0x1ecA25F68fa00ed5e86B7F00ADa2A06254f47C01','This is a about me','2018-05-17 01:01:01','2019-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(29,'456@yy.com','0x28a729C23c4304597ec10894A374fdD44Da5bA92','This is a about him','2020-05-17 01:01:01','2021-06-17 02:02:02',0,NULL,NULL,NULL,NULL,1),(30,'789@zz.com','0x371DBc24d5D230eBd3D9EB7D7E2Ba9a9d7Ba8683','This is a about her','2022-05-17 01:01:01','2023-06-17 02:02:02',1,NULL,NULL,NULL,NULL,1),(32,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808',NULL,NULL,'2023-04-27 23:25:23','2023-04-27 23:26:04',1,'Edward','Tam','vyj8xydrdq@privaterelay.appleid.com','r9ef10454db71489dabf003202a42de1c.0.szyu.xFPH6UMhZk-tnSs0ib_wWw',1),(33,'001972.4d3f31545cc74f09acd0a6799569a95e.0333',NULL,'how about this','2023-05-12 23:45:18','2023-07-11 18:43:43',1,'Edward','Tam','edwardtam_sj@yahoo.com','r4e3ea17bac8b499783e5b118fee36f72.0.srzxs.l6s9ZLm91C2MhLuMkoICZQ',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walletAddress`
--

LOCK TABLES `walletAddress` WRITE;
/*!40000 ALTER TABLE `walletAddress` DISABLE KEYS */;
INSERT INTO `walletAddress` VALUES (3,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','0x4BCC679c78E2C6D724E49B2F59f0F3B0565854D9','2023-06-12 00:06:07','2023-07-06 16:29:19'),(13,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x54B6Acc64bf7A7cf7450a2C3025c29dC71974c1E','2023-06-26 09:22:14','2023-06-26 09:22:14'),(14,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x6Bf589b61ceF72080A620660F0cD2b442174f2Cf','2023-06-26 09:22:46','2023-07-06 12:06:53'),(15,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751Ab','2023-06-26 15:30:59','2023-07-04 16:04:49'),(18,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x5248099D624063a83fa37f22f8243A80e56D5138','2023-06-28 09:22:04','2023-08-11 15:41:23'),(19,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x1a4157D4129908EDF31aa34164aD01b1F0AAd016','2023-06-28 23:47:07','2023-07-04 16:05:40'),(20,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0x41db300E0507F4f35C8648271B4450b29fC7eD53','2023-07-04 16:11:00','2023-07-04 16:11:53'),(21,'000984.272ea5bb414443a9b8f4c82b0dc5956e.1613','0x1f6A403347fd2d335d14Dc3f1AEb21D9192cF166','2023-07-04 16:13:10','2023-07-04 16:13:10'),(22,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808','0x0e1543219ddEed5e71e53028920d3b9811A25f98','2023-07-04 16:14:23','2023-07-04 16:25:18'),(23,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808','0x9B39710bD511bc14Fcb0f64a9D8f8e6F630751123','2023-07-06 16:27:33','2023-07-06 16:27:33'),(24,'001953.837897e29b434ebd81b3c9f13efb7bd3.0808','0xfa0F41af91EFE9A3bD60b05a5da94130064AF8C1','2023-07-07 00:40:07','2023-07-07 00:48:34'),(25,'001972.4d3f31545cc74f09acd0a6799569a95e.0333','0xef4cF75b222c45C89D315Ba1781C85E81D0F2832','2023-07-17 14:00:30','2023-08-10 18:01:57');
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

-- Dump completed on 2023-08-12 14:33:02
