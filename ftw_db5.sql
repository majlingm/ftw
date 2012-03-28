SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `ftw3` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `ftw3` ;

-- -----------------------------------------------------
-- Table `ftw3`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ftw3`.`Users` ;

CREATE  TABLE IF NOT EXISTS `ftw3`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `surname` VARCHAR(100) NULL ,
  `lastname` VARCHAR(100) NULL ,
  `username` VARCHAR(50) NULL ,
  `user_level` INT NULL ,
  `email` VARCHAR(250) NULL ,
  `tel` VARCHAR(100) NULL ,
  `profile_picture` VARCHAR(1000) NULL ,
  `password` VARCHAR(1000) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ftw3`.`Menus`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ftw3`.`Menus` ;

CREATE  TABLE IF NOT EXISTS `ftw3`.`Menus` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `html_id` VARCHAR(250) NULL ,
  `container_id` VARCHAR(250) NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `html_id_UNIQUE` (`html_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ftw3`.`Menu_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ftw3`.`Menu_items` ;

CREATE  TABLE IF NOT EXISTS `ftw3`.`Menu_items` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `Menus_id` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `link` VARCHAR(45) NULL ,
  `sort_order` DOUBLE NULL ,
  `access_level` INT NULL ,
  `hidden` VARCHAR(45) NULL ,
  `creation_date` TIMESTAMP NULL ,
  PRIMARY KEY (`id`, `Menus_id`) ,
  INDEX `fk_Menu_items_Menus1` (`Menus_id` ASC) ,
  CONSTRAINT `fk_Menu_items_Menus1`
    FOREIGN KEY (`Menus_id` )
    REFERENCES `ftw3`.`Menus` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ftw3`.`content_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ftw3`.`content_type` ;

CREATE  TABLE IF NOT EXISTS `ftw3`.`content_type` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `type` VARCHAR(45) NULL ,
  `body` LONGTEXT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ftw3`.`Content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ftw3`.`Content` ;

CREATE  TABLE IF NOT EXISTS `ftw3`.`Content` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `Menu_items_id` INT NOT NULL ,
  `sort_order` DOUBLE NULL ,
  `type` VARCHAR(100) NULL ,
  `body` LONGTEXT NULL ,
  `access_level` INT NULL ,
  `hidden` VARCHAR(45) NULL ,
  `creation_date` TIMESTAMP NULL ,
  `content_type_id` INT NOT NULL ,
  PRIMARY KEY (`id`, `Menu_items_id`, `content_type_id`) ,
  INDEX `fk_Content_Menu_items1` (`Menu_items_id` ASC) ,
  INDEX `fk_Content_content_type1` (`content_type_id` ASC) ,
  CONSTRAINT `fk_Content_Menu_items1`
    FOREIGN KEY (`Menu_items_id` )
    REFERENCES `ftw3`.`Menu_items` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Content_content_type1`
    FOREIGN KEY (`content_type_id` )
    REFERENCES `ftw3`.`content_type` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
