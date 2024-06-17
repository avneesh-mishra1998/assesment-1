-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Admin', 'User') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `certification_Identity_Number` BIGINT NOT NULL,
    `certificate_Number` BIGINT NOT NULL,
    `cerificate_status` VARCHAR(191) NOT NULL,
    `accreditation_status` VARCHAR(191) NOT NULL,
    `certification_type` VARCHAR(191) NOT NULL,
    `certification_scope` TEXT NOT NULL,
    `certification_original_issue_date` DATETIME(3) NOT NULL,
    `certification_issue_date` DATETIME(3) NOT NULL,
    `expiry_date` DATETIME(3) NOT NULL,
    `entity_name` VARCHAR(255) NOT NULL,
    `entity_trading_name` VARCHAR(255) NOT NULL,
    `entity_name_in_english` VARCHAR(255) NOT NULL,
    `entity_unique_id` VARCHAR(191) NOT NULL,
    `entity_street` TEXT NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `website` VARCHAR(255) NOT NULL,
    `accreditation_body_name` VARCHAR(191) NOT NULL,
    `accreditation_body_acronym` VARCHAR(255) NOT NULL,
    `is_bulk_import` BOOLEAN NOT NULL,
    `imported_file_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Certificates_certification_Identity_Number_key`(`certification_Identity_Number`),
    UNIQUE INDEX `Certificates_certificate_Number_key`(`certificate_Number`),
    UNIQUE INDEX `Certificates_entity_unique_id_key`(`entity_unique_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
