-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: gtapi
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
-- Table structure for table `airdropCampaign`
--

DROP TABLE IF EXISTS `airdropCampaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airdropCampaign` (
  `campaignID` int NOT NULL AUTO_INCREMENT COMMENT 'ID of the Campaign',
  `campaignName` varchar(200) NOT NULL COMMENT 'Name of the Campaign',
  `contractAddress` varchar(45) NOT NULL COMMENT 'Contract address of the campaign',
  `startTime` datetime NOT NULL COMMENT 'Start time of the campaign',
  `endTime` datetime NOT NULL COMMENT 'endTime of the Campaign',
  `description` varchar(1000) NOT NULL COMMENT 'Description of the campaign',
  `whiteListURL` varchar(1000) DEFAULT NULL COMMENT 'URL of Whitelist in .json format',
  `merkleRoot` varchar(100) NOT NULL COMMENT 'Merkle Root ',
  PRIMARY KEY (`campaignID`),
  UNIQUE KEY `campaignID_UNIQUE` (`campaignID`),
  UNIQUE KEY `campaignName_UNIQUE` (`campaignName`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `airdropList`
--

DROP TABLE IF EXISTS `airdropList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airdropList` (
  `listID` int NOT NULL AUTO_INCREMENT COMMENT 'List ID',
  `campaignID` int NOT NULL COMMENT 'Campaign ID (from table airdropCampaign)',
  `walletID` varchar(45) NOT NULL COMMENT 'Wallet ID of the receipient',
  `noToken` decimal(30,18) NOT NULL COMMENT 'No. Of token to receive (18 decimals)',
  `claimTime` datetime DEFAULT NULL COMMENT 'Time to claim the token',
  `txnHash` varchar(70) DEFAULT NULL COMMENT 'Hash of the blockchain transaction',
  PRIMARY KEY (`listID`),
  UNIQUE KEY `listID_UNIQUE` (`listID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credential`
--

DROP TABLE IF EXISTS `credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credential` (
  `credentialID` int NOT NULL AUTO_INCREMENT COMMENT 'ID for credential',
  `name` varchar(100) NOT NULL,
  `credential` varchar(100) NOT NULL COMMENT 'User password in md5',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'If the account is administrator',
  `isActive` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'If the account is active',
  PRIMARY KEY (`credentialID`),
  UNIQUE KEY `credentialID_UNIQUE` (`credentialID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `crypto`
--

DROP TABLE IF EXISTS `crypto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crypto` (
  `cryptoId` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `user` varchar(45) NOT NULL COMMENT 'Account login name',
  `sendTime` datetime NOT NULL COMMENT 'Time when batch was sent',
  `chain` varchar(10) NOT NULL COMMENT 'BNB Smart Chain (BNB)/Polygon',
  `tokenAddress` varchar(45) NOT NULL COMMENT 'GT token address',
  `walletAddress` varchar(45) NOT NULL COMMENT 'Wallet address of the recipient',
  `tokenNo` int NOT NULL COMMENT 'No. of token sent to the address',
  `gasPrice` int NOT NULL COMMENT 'Gas Price',
  `gasLimit` int NOT NULL COMMENT 'Gas Limit',
  `note` varchar(1000) DEFAULT NULL COMMENT 'Notes specified on the input',
  `txnHash` varchar(80) DEFAULT NULL COMMENT 'Used by URL link to blockchain explorer where details of transaction can be found',
  `success` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1-success, 0-fail',
  PRIMARY KEY (`cryptoId`)
) ENGINE=InnoDB AUTO_INCREMENT=1509 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email` (
  `emailID` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `user` varchar(45) NOT NULL COMMENT 'Account login name',
  `sendTime` datetime NOT NULL COMMENT 'Time when batch was sent',
  `chain` varchar(10) NOT NULL COMMENT 'BNB Smart Chain (BNB)/Polygon',
  `tokenAddress` varchar(45) NOT NULL COMMENT 'GT token address',
  `emailTemplateID` int NOT NULL,
  `emailAddress` varchar(100) NOT NULL COMMENT 'Email Address',
  `tokenNo` int NOT NULL COMMENT 'No. of token sent to the address',
  `expiry` datetime NOT NULL COMMENT 'Expiry Date of the key date & time in GMT',
  `KYC` tinyint(1) NOT NULL COMMENT 'Know your customer needed (i.e. 0 or 1)',
  `KYCResult` tinyint(1) DEFAULT NULL COMMENT '1 - approved: KYC application has been approved\n0 - rejected: Operator has rejected one or more attributes, User can resubmit\n2 - incomplete: Blockpass verifications pending\n3 - waiting: Operator''s review pending\n4 - inreview: In review by Operator\n5 - blocked : Operator has blocked the profile, User cannot resubmit',
  `KYCResultUpdateTime` datetime DEFAULT NULL COMMENT 'Last Time when KYC Result is updated from BlockPass',
  `uniqueKey` varchar(45) NOT NULL COMMENT 'Unique key on the email, embed in the URL. Will\\rbecome invalid once user clicks the link',
  `sendStatus` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Email sending status (0 – Failed, 1 – Passed)',
  `linkClicked` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 – user hasn’t clicked the link yet\\\\r1 – user has clicked the link already',
  `whenClicked` datetime DEFAULT NULL COMMENT 'Time when user clicked the link',
  `walletAddress` varchar(45) DEFAULT NULL COMMENT 'Wallet address captured',
  `tokenSent` int DEFAULT '0' COMMENT 'No. of token sent to this wallet address',
  `note` varchar(1000) DEFAULT NULL COMMENT 'Notes specified on the input',
  PRIMARY KEY (`emailID`),
  UNIQUE KEY `emailID_UNIQUE` (`emailID`),
  UNIQUE KEY `UniqueKey_UNIQUE` (`uniqueKey`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailFromAddress`
--

DROP TABLE IF EXISTS `emailFromAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailFromAddress` (
  `addressID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL COMMENT 'Email address',
  `clientID` varchar(100) NOT NULL COMMENT 'Client ID',
  `clientSecret` varchar(100) NOT NULL COMMENT 'Client Secret',
  `redirectURI` varchar(100) NOT NULL COMMENT 'Redirect URI',
  `refreshToken` varchar(500) NOT NULL COMMENT 'Refresh Token',
  `isActive` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'If address is Active',
  PRIMARY KEY (`addressID`),
  UNIQUE KEY `addressID_UNIQUE` (`addressID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailTemplate`
--

DROP TABLE IF EXISTS `emailTemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailTemplate` (
  `emailTemplateID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT 'Name of the template',
  `addressID` int NOT NULL COMMENT 'The from address of the email template',
  `subjectBSC` varchar(100) DEFAULT NULL COMMENT 'Email subject for BSC',
  `subjectPolygon` varchar(100) DEFAULT NULL COMMENT 'Email subject for Polygon',
  `contentBSC` text COMMENT 'Content of the email template for BSC',
  `contentPolygon` text COMMENT 'Content of the email template for Polygon',
  `isActive` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'If the template is active',
  PRIMARY KEY (`emailTemplateID`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `emailTemplateID_UNIQUE` (`emailTemplateID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emailTemplateLookup`
--

DROP TABLE IF EXISTS `emailTemplateLookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emailTemplateLookup` (
  `lookupID` int NOT NULL AUTO_INCREMENT COMMENT 'Record ID',
  `credentialID` int NOT NULL COMMENT 'ID for credential',
  `emailTemplateID` int NOT NULL COMMENT 'ID for email Template',
  PRIMARY KEY (`lookupID`),
  UNIQUE KEY `lookupID_UNIQUE` (`lookupID`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lastExecute`
--

DROP TABLE IF EXISTS `lastExecute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lastExecute` (
  `process` varchar(50) NOT NULL,
  `lastExecTime` datetime NOT NULL COMMENT 'Record the last execution time of the scheduled job',
  PRIMARY KEY (`process`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-27 15:26:31
