DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `authorBook`;
DROP TABLE IF EXISTS `books`;
DROP TABLE IF EXISTS `genres`;

DROP TABLE IF EXISTS `authors`;
DROP TABLE IF EXISTS `publishers`;


CREATE TABLE `users` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(10) NOT NULL
);

INSERT INTO `users` (`email`, `password`, `role`) VALUES
    ('roger@books.com', 'password', 'ROLE_USER')
;

CREATE TABLE `admin` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(10) NOT NULL
);

INSERT INTO `admin` (`email`, `password`, `role`) VALUES
    ('lovely@books.com', '$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5$+v4ZzuSpu+hjQ1UflhJVaA', 'ROLE_ADMIN')
;


CREATE TABLE `genres` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL
);

INSERT INTO `genres` (`name`) VALUES
    ('roman policier'),
    ('roman de moeurs'),
    ('roman apprentissage'),
    ('roman aventures'),
    ('humour'),
    ('fantastique'),
    ('manga'),
    ('manhwa'),
    ('comics'),
    ('poésie')
;


CREATE TABLE `authors` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `fullname` VARCHAR(150) NOT NULL
);

INSERT INTO `authors` (`fullname`) VALUES
    ('Marry Higgins Clark'),
    ('Gérard de Villiers'),
    ('Rajaonah Tselatra'),
    ('Ny Avana Ramanantoanina'),
    ('Alfred Andrianaly'),
    ('Rado'),
    ('Eiichirō Oda'),
    ('Chugong'),
    ('Stan Lee'),
    ('J.K Rowling')
;


CREATE TABLE `publishers` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL
);

INSERT INTO `publishers` (`name`, `city`) VALUES
    ('SHUEISHA', 'Japon'),
    ('Pika Edition', 'Vanve'),
    ('Marvel Comics', 'New York'),
    ('Ambozontany', 'Antananarivo'),
    ('D&C Media', 'Corée'),
    ('Gallimard', 'France'),
    ('Akata', 'Marseille')
;

CREATE TABLE `books` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `releaseDate`DATE NOT NULL,
    `picture` VARCHAR(255),
    `price` FLOAT,
    `publisherId` INT,
    `genreId` INT,
    Foreign Key (publisherId) REFERENCES publishers(id),
    Foreign Key (genreId) REFERENCES genres(id)
);

INSERT INTO `books` (`name`, `description`, `releaseDate`,`picture`,`price`,`publisherId`,`genreId` ) VALUES
    ('Solo Leveling', 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation', '2016-07-25', 'https://upload.wikimedia.org/wikipedia/en/9/99/Solo_Leveling_Webtoon.png', 5.5, 5, 8),
    ('Harry Potter', 'Harry Potter, un jeune orphelin, est élevé par son oncle et sa tante qui le détestent...', '1999-08-25', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F09%2Fhpsorcstone.jpg&q=60', 8.8, 6, 10),
    ('Iron Man', 'Le corps de Iron Man est celui d un homme normal, sans pouvoir surnaturel ou surhumain, mais rendu surpuissant', '1963-01-04', 'https://cdn.marvel.com/content/1x/invim2022001_cover.jpg', 5.5, 3, 9),
    ('Ohabolana hainteny', 'Boky fandalinana siantifika ny Ohabolana sy ny Hain-teny (malagasy) nosoratan i Bakoly Domenichini-Ramiaramanana', '1983-04-01', 'https://www.aedim.mg/wp-content/uploads/2019/03/Lovako-T3-270x387.jpg', 40.5, 4, 3),
    ('One Piece', 'Monkey D. Luffy rêve de retrouver ce trésor légendaire et de devenir le nouveau Roi des Pirates', '1997-07-22', 'https://upload.wikimedia.org/wikipedia/en/a/a3/One_Piece%2C_Volume_1.jpg', 18.5, 1, 7),
    ('THe Ink Black Heart', 'Edie est persécutée en ligne par un mystérieux personnage répondant au pseudonyme de Anomie','2022-08-30', 'https://cdn.kobo.com/book-images/0eaad213-42da-4571-8677-d71bf88975a0/353/569/90/False/the-ink-black-heart.jpg', 20.96, 6, 1) 
;


CREATE TABLE `authorBook` (
    `authorId`INT,
    `bookId`INT,
    Foreign Key (authorId) REFERENCES authors(id),   
    Foreign Key (bookId) REFERENCES books(id)
);

INSERT INTO `authorBook` (`authorId`, `bookId`) VALUES
    (4, 4),
    (10, 6)
;
