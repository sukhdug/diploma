-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: diploma
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

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
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `biography` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `authors` varchar(255) NOT NULL,
  `publication_date` int(11) DEFAULT NULL,
  `cover` varchar(255) NOT NULL,
  `genres` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `rating` varchar(10) DEFAULT NULL,
  `description` text NOT NULL,
  `link` varchar(255) NOT NULL,
  `fromsite` varchar(45) NOT NULL,
  `reviews_count` int(11) NOT NULL,
  `quote_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Женщина в окне','А. Дж. Финн',NULL,'https://j.livelib.ru/boocover/1002730403/200/52e9/A._Dzh._Finn__Zhenschina_v_okne.jpg','Детективы, Зарубежные детективы','978-5-389-13265-8','3.70','Анна Фокс детский психолог, год назад пережившая страшную трагедию. Теперь она стала заложницей в своем собственном доме. Анна страдает агорафобией и уже много месяцев не выходит на улицу. Родные оставили ее, хотя Анна регулярно разговаривает с ними по телефону. Свои дни она коротает за бокалом вина, просмотром старых фильмов, общением в интернет-форумах… и слежкой за соседями. \r\nОднажды в доме, расположенном через сквер, появляются новые жильцы: отец, мать, сын-подросток. Благополучная, просто идеальная семья. Но как-то раз Анна, наставив в окно объектив камеры, видит шокирующее преступление. Или ей все показалось? Никто не воспринимает ее всерьез, полиция не верит ее словам — под грузом открывающихся тайн и секретов мир Анны начинает рушиться... Где правда, а где вымысел? Ей самой предстоит докопаться до истины.','https://livelib.ru/book/1002730403-zhenschina-v-okne-a-dzh-finn','livelib',10,NULL),(2,'Один из нас лжет','Карен М. Макманус',NULL,'https://j.livelib.ru/boocover/1002730319/200/0fed/Karen_M._Makmanus__Odin_iz_nas_lzhet.jpg','Зарубежные детективы','978-5-17-103778-9','4.13','Строгий учитель в наказание оставил пятерых старшеклассников в классе после уроков, но только четверо вышли оттуда живыми. Пятый, Саймон, — школьный изгой, жестоко мстивший своим обидчикам в Интернете, раскрывая их самые неприглядные секреты, — был найден мертвым. Полиция не сомневается в том, что это убийство. Под подозрение попадают все, ведь у каждого есть что скрывать. Но кто из четверых юношей и девушек — убийца? Бронвин — круглая отличница, поступающая в \"Лигу плюща\"? Эдди — первая красавица школы, блондинка из рекламы шампуня? Нейт — юный преступник, находящийся на испытательном сроке? Купер — восходящая звезда бейсбола с лицом и фигурой Капитана Америки, кумир девушек? У каждого из них были свои причины избавиться от Саймона. Но кто же пошел на преступление?','https://livelib.ru/book/1002730319-odin-iz-nas-lzhet-karen-m-makmanus','livelib',4,NULL),(3,'Галапагосы','Курт Воннегут',NULL,'https://j.livelib.ru/boocover/1002734514/200/032d/Kurt_Vonnegut__Galapagosy.jpg','Зарубежная классика','978-5-17-105969-9','3.98','\"Галапагосы\" – роман, в котором Воннегут со свойственной ему тонкой сверкающей иронией продолжает истории многих героев и антигероев своей ранней прозы – и делает это со зрелой мудростью настоящего мастера. Небольшой островок Галапагосского архипелага стал пристанищем для людей, чудом уцелевших после всемирной катастрофы. Выжили лишь немногие – и как назло, не самые лучшие представители человечества...','https://livelib.ru/book/1002734514-galapagosy-kurt-vonnegut','livelib',30,NULL),(4,'Пустой стул','Джеффри Дивер',NULL,'https://i.livelib.ru/boocover/1002730406/200/8104/Dzheffri_Diver__Pustoj_stul.jpg','Зарубежные детективы','978-5-389-14036-3','4.30','В окрестностях захолустного городка в течение суток убивают школьника и одну за другой похищают двух девушек. Шериф округа обращается за помощью к гениальному криминалисту Линкольну Райму, который прикован к инвалидному креслу. Под подозрением находится психически неуравновешенный шестнадцатилетний подросток. Райм соглашается помочь следствию и вместе со своей неизменной помощницей Амелией Сакс быстро находит предполагаемого преступника. Однако мальчишка уверяет, что никого не убивал и похитил девушек, чтобы спасти от смертельной опасности. По мере расследования криминалисты убеждаются, что этот тихий маленький городок — настоящее осиное гнездо...','https://livelib.ru/book/1002730406-pustoj-stul-dzheffri-diver','livelib',20,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_commands`
--

DROP TABLE IF EXISTS `bot_commands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bot_commands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `command` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_commands`
--

LOCK TABLES `bot_commands` WRITE;
/*!40000 ALTER TABLE `bot_commands` DISABLE KEYS */;
/*!40000 ALTER TABLE `bot_commands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection_books`
--

DROP TABLE IF EXISTS `collection_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collection_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_books`
--

LOCK TABLES `collection_books` WRITE;
/*!40000 ALTER TABLE `collection_books` DISABLE KEYS */;
INSERT INTO `collection_books` VALUES (1,'Дело без трупа. Неоконченное дело','978-5-17-100176-6','https://livelib.ru/book/1002718437-delo-bez-trupa-neokonchennoe-delo-leo-bryus','new'),(2,'Женщина в окне','9785389132658','https://livelib.ru/book/1002730403-zhenschina-v-okne-a-dzh-finn','added'),(3,'Один из нас лжет','978-5-17-103778-9','https://livelib.ru/book/1002730319-odin-iz-nas-lzhet-karen-m-makmanus','added'),(4,'Завтра я буду скучать по тебе','978-5-17-102624-0','https://livelib.ru/book/1002730321-zavtra-ya-budu-skuchat-po-tebe-hejne-bakkejd','new'),(5,'Меловой Человек','978-617-12-4331-6','https://livelib.ru/book/1002736315-melovoj-chelovek-s-dzh-tyudor','new'),(6,'Забытые','978-5-04-090833-2','https://livelib.ru/book/1002733464-zabytye-sara-bledel','new'),(7,'Охота на Джека-потрошителя','978-5-17-982482-4','https://livelib.ru/book/1002751217-ohota-na-dzhekapotroshitelya-kerri-maniskalko','new'),(8,'Огненная дева','978-5-04-091103-5','https://livelib.ru/book/1002751706-ognennaya-deva-dzhennifer-makmahon','new'),(9,'Природа зверя','978-5-389-11468-5','https://livelib.ru/book/1002717939-priroda-zverya-luiza-penni','new'),(10,'Остров Камино','978-5-17-982582-1','https://livelib.ru/book/1002506043-ostrov-kamino-dzhon-grishem','new'),(11,'Полночь в саду добра и зла','978-5-17-982400-8','https://livelib.ru/book/1002744679-polnoch-v-sadu-dobra-i-zla-dzhon-berendt','new'),(12,'Мертвые души','978-5-04-090872-1','https://livelib.ru/book/1002723215-mertvye-dushi-anzhela-marsons','new'),(13,'Хорошее поведение','978-5-04-090985-8','https://livelib.ru/book/1002737427-horoshee-povedenie-blejk-krauch','new'),(14,'Убийца','978-5-04-090126-5','https://livelib.ru/book/1002723217-ubijtsa-dzhonatan-kellerman','new'),(15,'Фикс','978-5-04-090995-7','https://livelib.ru/book/1002729509-fiks-devid-boldachchi','new'),(16,'Ночной охотник','978-5-17-104747-4','https://livelib.ru/book/1002730318-nochnoj-ohotnik-robert-bryndza','new'),(17,'Время-убийца','978-5-86471-781-3','https://livelib.ru/book/1002086356-vremyaubijtsa-mishel-byussi','new'),(18,'Двенадцать ключей Рождества','978-5-17-982481-7','https://livelib.ru/book/1002729946-dvenadtsat-klyuchej-rozhdestva-fillis-doroti-dzhejms','new'),(19,'Третий близнец','978-5-17-106925-4','https://livelib.ru/book/1002731702-tretij-bliznets-ken-follett','new'),(20,'Алиенист','978-5-17-107377-0','https://livelib.ru/book/1002749691-alienist-kaleb-karr','new'),(21,'Без предела','978-5-04-091076-2','https://livelib.ru/book/1002729505-bez-predela-yussi-adlerolsen','new'),(22,'Четвертая дверь','978-5-17-105091-7','https://livelib.ru/book/1002730316-chetvertaya-dver-pol-alter','new'),(23,'Дочь палача и Совет двенадцати','978-5-04-091355-8','https://livelib.ru/book/1002750757-doch-palacha-i-sovet-dvenadtsati-oliver-pjotch','new'),(24,'Южные моря. Греческий лабиринт','978-5-17-090952-0','https://livelib.ru/book/1002706831-yuzhnye-morya-grecheskij-labirint-manuel-vaskes-montalban','new'),(25,'Пустой стул','978-5-389-14036-3','https://livelib.ru/book/1002730406-pustoj-stul-dzheffri-diver','added'),(27,'Вызовите акушерку. Тени Ист-Энда','978-5-9909713-1-8','https://livelib.ru/book/1002699839-vyzovite-akusherku-teni-istenda-dzhennifer-uorf','new'),(28,'Люди среди деревьев','978-5-17-102325-6','https://livelib.ru/book/1002566921-lyudi-sredi-derevev-hanya-yanagihara','new'),(29,'Под алыми небесами','978-5-389-13828-5','https://livelib.ru/book/1002730381-pod-alymi-nebesami-mark-sallivan','new'),(30,'Опускается ночь','978-5-389-12971-9','https://livelib.ru/book/1002717942-opuskaetsya-noch-ketrin-uebb','new'),(31,'Пропавший без вести','978-5-17-982633-0','https://livelib.ru/book/1002706833-propavshij-bez-vesti-lyusi-klark','new'),(32,'Витающие в облаках','978-5-389-09972-2','https://livelib.ru/book/1002730382-vitayuschie-v-oblakah-kejt-atkinson','new'),(33,'Марина','978-5-17-100058-5','https://livelib.ru/book/1002723124-marina-karlos-ruis-safon','new'),(34,'Тайны Торнвуда','978-5-17-100357-9','https://livelib.ru/book/1002730331-tajny-tornvuda-anna-romer','new'),(35,'Все нечестные святые','978-5-04-090471-6','https://livelib.ru/book/1002744595-vse-nechestnye-svyatye-meggi-stivoter','new'),(36,'Одно целое','978-5-04-089831-2','https://livelib.ru/book/1002727501-odno-tseloe-sara-krossan','new'),(37,'Три версии нас','978-5-906837-89-9','https://livelib.ru/book/1002742213-tri-versii-nas-lora-barnett','new'),(38,'Красный гаолян','978-5-7516-1474-4','https://livelib.ru/book/1001265553-krasnyj-gaolyan-mo-yan','new'),(39,'Время свинга','978-5-04-090843-1','https://livelib.ru/book/1002749682-vremya-svinga-zedi-smit','new'),(40,'Собиратели ракушек','978-5-389-14060-8','https://livelib.ru/book/1002753970-sobirateli-rakushek-rozamunda-pilcher','new'),(41,'Добрее одиночества','978-5-17-982500-5','https://livelib.ru/book/1002748671-dobree-odinochestva-iyun-li','new'),(42,'Японский любовник','978-5-389-12858-3','https://livelib.ru/book/1002753108-yaponskij-lyubovnik-isabel-alende','new'),(43,'Моя любовь когда-нибудь очнется','978-5-04-090859-2','https://livelib.ru/book/1002723855-moya-lyubov-kogdanibud-ochnetsya-charlz-martin','new'),(44,'Там, где тебя ждут','978-5-04-090896-7','https://livelib.ru/book/1002732333-tam-gde-tebya-zhdut-meggi-ofarrell','new'),(45,'Тонкая работа','978-5-389-13142-2','https://livelib.ru/book/1002730399-tonkaya-rabota-sara-uoters','new'),(46,'Вызовите акушерку. Прощание с Ист-Эндом','978-5-6040082-2-5','https://livelib.ru/book/1002749721-vyzovite-akusherku-proschanie-s-istendom-dzhennifer-uorf','new'),(47,'Что они несли с собой','978-5-17-983286-7','https://livelib.ru/book/1002706824-chto-oni-nesli-s-soboj-tim-obrajen','new'),(48,'Требуется идеальная женщина','978-5-17-101630-2','https://livelib.ru/book/1002731704-trebuetsya-idealnaya-zhenschina-ann-berest','new'),(49,'Бойцовые рыбки','978-5-6040082-3-2','https://livelib.ru/book/1002742230-bojtsovye-rybki-s-e-hinton','new'),(50,'Убить пересмешника','978-5-17-090411-2','https://livelib.ru/book/1002723093-ubit-peresmeshnika-harper-li','new'),(51,'Замок Дор. Прощай, молодость','978-5-389-08546-6','https://livelib.ru/book/1002717929-zamok-dor-proschaj-molodost-dafna-dyumore','new'),(52,'Зрелость','978-5-699-87375-3','https://livelib.ru/book/1002713749-zrelost-simona-de-bovuar','new'),(53,'Город и звезды','978-5-17-105787-9','https://livelib.ru/book/1002698860-gorod-i-zvezdy-artur-klark','new'),(54,'Лавка древностей','978-5-04-090825-7','https://livelib.ru/book/1002723610-lavka-drevnostej-charlz-dikkens','new'),(55,'Конец парада. Каждому свое','978-5-386-10538-9','https://livelib.ru/book/1002742214-konets-parada-kazhdomu-svoe-ford-medoks-ford','new'),(56,'Козел отпущения. Правь, Британия!','978-5-389-12164-5','https://livelib.ru/book/1002751641-kozel-otpuscheniya-prav-britaniya-dafna-dyu-more','new'),(57,'Грозовой перевал','978-5-04-090654-3','https://livelib.ru/book/1002723611-grozovoj-pereval-emili-bronte','new'),(58,'Приключения Оливера Твиста','978-5-4444-5820-4','https://livelib.ru/book/1002729912-priklyucheniya-olivera-tvista-charlz-dikkens','new'),(59,'Гость Дракулы. Сборник','978-5-17-104023-9','https://livelib.ru/book/1002718446-gost-drakuly-sbornik-brem-stoker','new'),(60,'Финансист','978-5-17-106459-4','https://livelib.ru/book/1002734515-finansist-teodor-drajzer','new'),(61,'Крестоносцы','978-5-389-14229-9','https://livelib.ru/book/1002751684-krestonostsy-genrik-senkevich','new'),(62,'Порою блажь великая','978-5-389-14085-1','https://livelib.ru/book/1002753975-poroyu-blazh-velikaya-ken-kizi','new'),(63,'Война миров','978-5-8475-1066-0','https://livelib.ru/book/1002706492-vojna-mirov-gerbert-uells','new'),(64,'Фунты лиха в Париже и Лондоне. Дорога на Уиган-Пирс','978-5-17-104841-9','https://livelib.ru/book/1002733483-funty-liha-v-parizhe-i-londone-doroga-na-uiganpirs-dzhordzh-oruell','new'),(65,'Моя семья и другие звери','978-5-389-12396-0','https://livelib.ru/book/1002751680-moya-semya-i-drugie-zveri-dzherald-darrell','new'),(66,'Земля','978-5-17-104823-5','https://livelib.ru/book/1002759185-zemlya-perl-bak','new'),(67,'Змеиный перевал','978-5-8370-0846-7','https://livelib.ru/book/1002762405-zmeinyj-pereval-brem-stoker','new'),(68,'Рождественские повести','978-5-521-00856-8','https://livelib.ru/book/1002733315-rozhdestvenskie-povesti-charlz-dikkens','new'),(69,'Галапагосы','978-5-17-105969-9','https://livelib.ru/book/1002734514-galapagosy-kurt-vonnegut','added'),(70,'Женщина в песках. Человек-ящик. Чужое лицо. Совсем как человек','978-5-389-13885-8','https://livelib.ru/book/1002718144-zhenschina-v-peskah-chelovekyaschik-chuzhoe-litso-sovsem-kak-chelovek-kobo-abe','new'),(71,'Дэвид Копперфилд','978-5-17-104889-1','https://livelib.ru/book/1002752449-devid-kopperfild-charlz-dikkens','new'),(72,'Зверь: сборник','978-617-12-4311-8','https://livelib.ru/book/1002721376-zver-sbornik-ernest-setontompson','new'),(73,'Корни неба','978-5-04-088664-7','https://livelib.ru/book/1002719595-korni-neba-romen-gari','new'),(74,'Прекрасные и проклятые','978-5-04-090824-0','https://livelib.ru/book/1002726790-prekrasnye-i-proklyatye-frensis-skott-fitsdzherald','new'),(75,'Навсе...где?','978-5-17-100048-6','https://livelib.ru/book/1002085429-navsegde-hejdi-hejlig','new'),(76,'Совершенство','978-5-17-102876-3','https://livelib.ru/book/1002734548-sovershenstvo-kler-nort','new'),(77,'Три дня до небытия','978-5-17-098758-0','https://livelib.ru/book/1002733476-tri-dnya-do-nebytiya-tim-pauers','new'),(78,'Черный человек','978-5-17-099083-2','https://livelib.ru/book/1002723518-chernyj-chelovek-richard-morgan','new'),(79,'Рыцарь бесконечности','978-5-00115-302-3','https://livelib.ru/book/1002717713-rytsar-beskonechnosti-kresli-koul','new'),(80,'Борн','978-5-04-091027-4','https://livelib.ru/book/1002743022-born-dzheff-vandermeer','new'),(81,'Излом времени. Квинтет времени','978-5-389-13947-3','https://livelib.ru/book/1002751335-izlom-vremeni-kvintet-vremeni-madlen-lengl','new'),(82,'Мечтают ли андроиды об электроовцах?','978-5-04-091170-7','https://livelib.ru/book/1002717523-mechtayut-li-androidy-ob-elektroovtsah-filip-k-dik','new'),(83,'Стигматы Палмера Элдрича','978-5-04-091171-4','https://livelib.ru/book/1002717522-stigmaty-palmera-eldricha-filip-k-dik','new'),(84,'Королевская битва','978-5-521-00914-5','https://livelib.ru/book/1002751321-korolevskaya-bitva-takami-kosyun','new'),(85,'Сквозь время (сборник)','978-5-389-13779-0','https://livelib.ru/book/1002717958-skvoz-vremya-sbornik-vernor-vindzh','new'),(86,'Уродина','978-5-17-107476-0','https://livelib.ru/book/1002752385-urodina-skott-vesterfeld','new'),(87,'Электрические сны (сборник)','978-5-04-091024-3','https://livelib.ru/book/1002735495-elektricheskie-sny-sbornik-filip-k-dik','new'),(88,'Опрокинутый мир','978-5-17-106873-8','https://livelib.ru/book/1002752697-oprokinutyj-mir-kristofer-prist','new'),(89,'Темный Разум','978-5-91878-246-0','https://livelib.ru/book/1002731249-temnyj-razum-nil-esher','new'),(90,'Погружение в Солнце','978-5-17-098272-1','https://livelib.ru/book/1002153035-pogruzhenie-v-solntse-devid-brin','new'),(91,'Эволюционирующая Бездна','978-5-91878-247-7','https://livelib.ru/book/1002734501-evolyutsioniruyuschaya-bezdna-piter-gamilton','new'),(92,'Первому игроку приготовиться','978-5-17-107194-3','https://livelib.ru/book/1002751726-pervomu-igroku-prigotovitsya-ernest-klajn','new'),(93,'Счастье — это теплый звездолет (сборник)','978-5-389-13317-4','https://livelib.ru/book/1002736269-schaste-eto-teplyj-zvezdolet-sbornik-dzhejms-tiptriml','new'),(94,'Аннигиляция','978-5-699-98967-6','https://livelib.ru/book/1002745594-annigilyatsiya-dzheff-vandermeer','new'),(95,'Разрушитель кораблей','978-5-04-091683-2','https://livelib.ru/book/1002750784-razrushitel-korablej-paolo-bachigalupi','new'),(96,'Затонувшие города','978-5-04-091838-6','https://livelib.ru/book/1002756372-zatonuvshie-goroda-paolo-bachigalupi','new'),(97,'Продажное королевство','978-5-17-106222-4','https://livelib.ru/book/1002707756-prodazhnoe-korolevstvo-li-bardugo','new'),(98,'Магония','978-5-17-105311-6','https://livelib.ru/book/1002727073-magoniya-mariya-hedli','new'),(99,'Книга пыли. Прекрасная Дикарка','978-5-17-982968-3','https://livelib.ru/book/1002723414-kniga-pyli-prekrasnaya-dikarka-filip-pulman','new'),(100,'Избранная луной','978-5-17-101597-8','https://livelib.ru/book/1002593509-izbrannaya-lunoj-f-k-kast','new'),(101,'Стертая','978-5-699-98476-3','https://livelib.ru/book/1002726214-stertaya-teri-terri','new'),(102,'The Cruel Prince','0316310271','https://livelib.ru/book/1002667819-the-cruel-prince-holly-black','new'),(103,'Эта свирепая песня','978-5-04-090961-2','https://livelib.ru/book/1002733192-eta-svirepaya-pesnya-viktoriya-shvab','new'),(104,'Сладкое зло','978-5-17-983291-1','https://livelib.ru/book/1002727498-sladkoe-zlo-vendi-higgins','new'),(105,'Королева тьмы','9785040908196','https://livelib.ru/book/1002736281-koroleva-tmy-sidzhej-redvajn','new'),(106,'Бессмертный','978-5-17-104950-8','https://livelib.ru/book/1002731200-bessmertnyj-ketrin-m-valente','new'),(107,'Остров Чаек','978-5-00115-252-1','https://livelib.ru/book/1002718888-ostrov-chaek-frensis-harding','new'),(108,'Агентство \"Фантом в каждый дом\"','978-5-17-099481-6','https://livelib.ru/book/1002718169-agentstvo-fantom-v-kazhdyj-dom-eva-ibbotson','new'),(109,'Убийца Войн','978-5-389-13266-5','https://livelib.ru/book/1002717952-ubijtsa-vojn-brendon-sanderson','new'),(110,'Блистательный Двор','978-5-04-088881-8','https://livelib.ru/book/1002726216-blistatelnyj-dvor-rajchel-mid','new'),(111,'Иней как ночь','978-5-00115-303-0','https://livelib.ru/book/1002718890-inej-kak-noch-sara-raash','new'),(112,'Открытие ведьм','978-5-389-12415-8','https://livelib.ru/book/1002730385-otkrytie-vedm-debora-harkness','new'),(113,'Затмение','978-5-17-106438-9','https://livelib.ru/book/1002718158-zatmenie-stefani-majer','new'),(114,'Рассвет','978-5-17-106904-9','https://livelib.ru/book/1002718156-rassvet-stefani-majer','new'),(115,'Преступление победителя','978-5-00115-301-6','https://livelib.ru/book/1002717714-prestuplenie-pobeditelya-mari-rutkoski','new'),(116,'Преследуемый. Hounded','978-5-04-089558-8','https://livelib.ru/book/1002750751-presleduemyj-hounded-kevin-hirn','new'),(117,'Стеклянная магия','978-5-699-90877-6','https://livelib.ru/book/1002751690-steklyannaya-magiya-charli-holmberg','new'),(118,'Двурожденные. Книга 3. Браслеты Скорби','978-5-389-13636-6','https://livelib.ru/book/1002730431-dvurozhdennye-kniga-3-braslety-skorbi-brendon-sanderson','new'),(119,'Магия безумия','978-5-04-090476-1','https://livelib.ru/book/1002756503-magiya-bezumiya-ag-govard','new'),(120,'Возвращение','978-5-17-104492-3','https://livelib.ru/book/1002759236-vozvraschenie-dzhennifer-armentrout','new');
/*!40000 ALTER TABLE `collection_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `link_livelib` varchar(255) NOT NULL,
  `link_litres` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Зарубежные детективы','https://www.livelib.ru/genre/Зарубежные-детективы','https://www.litres.ru/knigi-detektivy/zarubezhnye'),(2,'Современная зарубежная литература','https://www.livelib.ru/genre/Современная-зарубежная-литература','https://www.litres.ru/knigi-sovremennaya-proza/zarubezhnaya/'),(3,'Зарубежная классика','https://www.livelib.ru/genre/Зарубежная-классика','https://www.litres.ru/klassicheskaya-literatura/zarubezhnaya-klassika'),(4,'Зарубежная фантастика','https://www.livelib.ru/genre/Зарубежная-фантастика','https://www.litres.ru/knigi-fantastika/zarubezhnaya'),(5,'Зарубежное фэнтези','https://www.livelib.ru/genre/Зарубежное-фэнтези','https://www.litres.ru/knigi-fentezi/zarubezhnye'),(6,'Зарубежные любовные романы','https://www.livelib.ru/genre/Зарубежные-любовные-романы','https://www.litres.ru/knigi-lubovnye-romany/zarubezhnyye'),(7,'Зарубежная поэзия','https://www.livelib.ru/genre/Зарубежная-поэзия','https://www.litres.ru/knigi-poeziya-dramaturgiya/zarubezhnaya_poeziya'),(8,'Зарубежная драматургия','https://www.livelib.ru/genre/Зарубежная-драматургия','https://www.litres.ru/knigi-poeziya-dramaturgiya/zarubezhnaya-dramaturgiya'),(9,'Зарубежные приключения','https://www.livelib.ru/genre/Зарубежные-приключения','https://www.litres.ru/knigi-priklucheniya/zarubezhnye'),(10,'Зарубежные детские книги','https://www.livelib.ru/genre/Зарубежные-детские-книги','https://www.litres.ru/detskie-knigi/zarubezhnye'),(11,'Советская литература','https://www.livelib.ru/genre/Советская-литература','https://www.litres.ru/klassicheskaya-literatura/sovetskaya'),(12,'Русская классика','https://www.livelib.ru/genre/Русская-классика','https://www.litres.ru/klassicheskaya-literatura/russkaya'),(13,'Современная русская литература','https://www.livelib.ru/genre/Современная-русская-литература','https://www.litres.ru/knigi-sovremennaya-proza/russkaya-literatura'),(14,'Книги о войне','https://www.livelib.ru/genre/Книги-о-войне','https://www.litres.ru/knigi-sovremennaya-proza/knigi_o_voyne'),(15,'Мистика','https://www.livelib.ru/genre/Мистика','https://www.litres.ru/knigi-uzhasy-mistika-trillery/mistika'),(16,'Ужасы','https://www.livelib.ru/genre/Ужасы','https://www.litres.ru/knigi-uzhasy-mistika-trillery/uzhasy'),(17,'Вестерны','https://www.livelib.ru/genre/Вестерны','https://www.litres.ru/knigi-priklucheniya/vesterny');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_books`
--

DROP TABLE IF EXISTS `liked_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liked_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_books`
--

LOCK TABLES `liked_books` WRITE;
/*!40000 ALTER TABLE `liked_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `liked_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_books`
--

DROP TABLE IF EXISTS `notification_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `reader_id` int(11) NOT NULL,
  `notification_id` int(11) NOT NULL,
  `user_choose` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_books`
--

LOCK TABLES `notification_books` WRITE;
/*!40000 ALTER TABLE `notification_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `frequency` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `read_books`
--

DROP TABLE IF EXISTS `read_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `read_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `read_books`
--

LOCK TABLES `read_books` WRITE;
/*!40000 ALTER TABLE `read_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `read_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `readers`
--

DROP TABLE IF EXISTS `readers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `readers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `fromsite` varchar(45) NOT NULL,
  `reviews_count` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link` (`link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `readers`
--

LOCK TABLES `readers` WRITE;
/*!40000 ALTER TABLE `readers` DISABLE KEYS */;
/*!40000 ALTER TABLE `readers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommended_books`
--

DROP TABLE IF EXISTS `recommended_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recommended_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `reader_id` int(11) NOT NULL,
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_choose` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommended_books`
--

LOCK TABLES `recommended_books` WRITE;
/*!40000 ALTER TABLE `recommended_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `recommended_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(20) NOT NULL,
  `reader_id` int(20) NOT NULL,
  `rate` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `telegram_id` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-20 17:46:08
