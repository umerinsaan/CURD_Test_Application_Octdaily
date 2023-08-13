-- MariaDB dump 10.19  Distrib 10.11.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: leetcode
-- ------------------------------------------------------
-- Server version	10.11.4-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `acceptance` float NOT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES
(1,'Two Sum',50.1,'Easy'),
(2,'Add Two Numbers',40.7,'Medium'),
(3,'Longest Substring Without Repeating Characters',33.8,'Medium'),
(4,'Median of Two Sorted Arrays',36.7,'Hard'),
(5,'Longest Palindromic Substring',32.5,'Medium'),
(6,'Zigzag Conversion',45.3,'Medium'),
(7,'Reverse Integer',27.6,'Medium'),
(8,'String to Integer',16.7,'Medium'),
(9,'Palindrome Number',53.9,'Easy'),
(10,'Regular Expression Matching',28,'Hard'),
(11,'Container With Most Water',54,'Medium'),
(12,'Integer to Roman',62.4,'Medium'),
(13,'Roman to Integer',58.7,'Easy'),
(14,'Longest Common Prefix',41.1,'Easy'),
(15,'3Sum',32.8,'Medium'),
(16,'3Sum Closest',45.6,'Medium'),
(17,'Letter Combinations of a Phone Number',57.1,'Medium'),
(18,'4Sum',35.8,'Medium'),
(19,'Remove Nth Node From End of List',41.7,'Medium'),
(20,'Valid Parentheses',40.3,'Easy'),
(21,'Merge Two Sorted Lists',62.8,'Easy'),
(22,'Generate Parentheses',72.9,'Medium'),
(23,'Merge k Sorted Lists',50.3,'Hard'),
(24,'Swap Nodes in Pairs',62.6,'Medium'),
(25,'Reverse Nodes in k-Group',55.5,'Hard'),
(26,'Remove Duplicates from Sorted Array',52.2,'Easy'),
(27,'Remove Element',53.7,'Easy'),
(28,'Find the Index of the First Occurrence in a String',39.7,'Easy'),
(29,'Divide Two Integers',17.1,'Medium'),
(30,'Substring with Concatenation of All Words',31.5,'Hard'),
(31,'Next Permutation',38,'Medium'),
(32,'Longest Valid Parentheses',33,'Hard'),
(33,'Search in Rotated Sorted Array',39.2,'Medium'),
(34,'First and Last Position of Element in Sorted Array',42.1,'Medium'),
(35,'Search Insert Position',43.8,'Easy'),
(36,'Valid Sudoku',58.4,'Medium'),
(37,'Sudoku Solver',58.4,'Hard'),
(38,'Count and Say',52.6,'Medium'),
(39,'Combination Sum',69.1,'Medium'),
(40,'Combination Sum II',53.5,'Medium'),
(41,'First Missing Positive',36.9,'Hard'),
(42,'Trapping Rain Water',59.5,'Hard'),
(43,'Multiply Strings',39.3,'Medium'),
(44,'Wildcard Matching',27.1,'Hard'),
(45,'Jump Game II',40,'Medium'),
(46,'Permutations',76.1,'Medium'),
(47,'Permutations II',57.6,'Medium'),
(48,'Rotate Image',72,'Medium'),
(49,'Group Anagrams',66.8,'Medium'),
(50,'Pow(x, n)',33.9,'Medium'),
(51,'N-Queens',65.4,'Hard'),
(52,'N-Queens II',72.2,'Hard'),
(53,'Maximum Subarray',50.3,'Medium'),
(54,'Spiral Matrix',46.9,'Medium'),
(55,'Jump Game',46.9,'Medium'),
(56,'Merge Intervals',46.4,'Medium'),
(57,'Insert Interval',39.2,'Medium'),
(58,'Length of Last Word',44.9,'Easy'),
(59,'Spiral Matrix II',69.9,'Medium'),
(60,'Permutation Sequence',45.1,'Hard'),
(61,'Rotate List',36.5,'Medium'),
(62,'Unique Paths',62.9,'Medium'),
(63,'Unique Paths II',39.7,'Medium'),
(64,'Minimum Path Sum',62.5,'Medium'),
(65,'Valid Number',18.8,'Hard'),
(66,'Plus One',44,'Easy'),
(67,'Add Binary',52.5,'Easy'),
(68,'Text Justification',38.1,'Hard'),
(69,'Sqrt(x)',37.7,'Easy'),
(70,'Climbing Stairs',52.2,'Easy'),
(71,'Simplify Path',40.7,'Medium'),
(72,'Edit Distance',55,'Medium'),
(73,'Set Matrix Zeroes',52.6,'Medium'),
(74,'Search a 2D Matrix',48.3,'Medium'),
(75,'Sort Colors',59.7,'Medium'),
(76,'Minimum Window Substring',41.1,'Hard'),
(77,'Combinations',67.6,'Medium'),
(78,'Subsets',75.7,'Medium'),
(79,'Word Search',40.4,'Medium'),
(80,'Remove Duplicates from Sorted Array II',54,'Medium'),
(81,'Search in Rotated Sorted Array II',35.8,'Medium'),
(82,'Remove Duplicates From Sorted List II',46.3,'Medium'),
(83,'Remove Duplicates from Sorted List',51.2,'Easy');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-13 17:02:33
