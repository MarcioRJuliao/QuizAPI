// Script para criação do banco de dados e tabelas

-- -----------------------------------------------------
-- Schema quizApi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quizApi` DEFAULT CHARACTER SET utf8 ;
USE `quizApi` ;

-- -----------------------------------------------------
-- Table `quizApi`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizApi`.`User` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NULL,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `quizApi`.`Quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizApi`.`Quiz` (
  `quiz_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`quiz_id`),
  CONSTRAINT `fk_quiz_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `quizApi`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_quiz_user1_idx` ON `quizApi`.`Quiz` (`user_id` ASC) VISIBLE;

-- -----------------------------------------------------
-- Table `quizApi`.`subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizApi`.`subject` (
  `subject_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`subject_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `quizApi`.`Question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizApi`.`Question` (
  `question_id` INT NOT NULL AUTO_INCREMENT,
  `quiz_id` INT NOT NULL,
  `subject_id` INT NOT NULL,
  `text` VARCHAR(300) NULL,
  PRIMARY KEY (`question_id`),
  CONSTRAINT `fk_Question_Quiz1`
    FOREIGN KEY (`quiz_id`)
    REFERENCES `quizApi`.`Quiz` (`quiz_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Question_subject1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quizApi`.`subject` (`subject_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Question_Quiz1_idx` ON `quizApi`.`Question` (`quiz_id` ASC) VISIBLE;
CREATE INDEX `fk_Question_subject1_idx` ON `quizApi`.`Question` (`subject_id` ASC) VISIBLE;
CREATE INDEX `question_idx` ON `quizApi`.`Question` (`question_id`, `quiz_id`) VISIBLE;

-- -----------------------------------------------------
-- Table `quizApi`.`Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizApi`.`Answer` (
  `answer_id` INT NOT NULL AUTO_INCREMENT,
  `question_id` INT NOT NULL,
  `quiz_id` INT NOT NULL,
  `text` VARCHAR(200) NULL,
  `is_correct` TINYINT NULL,
  PRIMARY KEY (`answer_id`),
  CONSTRAINT `fk_Answer_Question1`
    FOREIGN KEY (`question_id`, `quiz_id`)
    REFERENCES `quizApi`.`Question` (`question_id`, `quiz_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_Answer_Question1_idx` ON `quizApi`.`Answer` (`question_id` ASC, `quiz_id` ASC) VISIBLE;
CREATE INDEX `answer_idx` ON `quizApi`.`Answer` (`answer_id`, `question_id`, `quiz_id`) VISIBLE;

-- -----------------------------------------------------
-- Table `quizApi`.`User_has_Answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizApi`.`User_has_Answer` (
  `user_id` INT NOT NULL,
  `answer_id` INT NOT NULL,
  `question_id` INT NOT NULL,
  `quiz_id` INT NOT NULL,
  `selection_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `answer_id`, `question_id`, `quiz_id`),
  CONSTRAINT `fk_User_has_Answer_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `quizApi`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Answer_Answer1`
    FOREIGN KEY (`answer_id`, `question_id`, `quiz_id`)
    REFERENCES `quizApi`.`Answer` (`answer_id`, `question_id`, `quiz_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_User_has_Answer_Answer1_idx` ON `quizApi`.`User_has_Answer` (`answer_id` ASC, `question_id` ASC, `quiz_id` ASC) VISIBLE;
CREATE INDEX `fk_User_has_Answer_User1_idx` ON `quizApi`.`User_has_Answer` (`user_id` ASC) VISIBLE;