-- 1. Create the new ProjectCaseStudy table
CREATE TABLE `project_case_studies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `problem` LONGTEXT NULL,
    `solution` LONGTEXT NULL,
    `result` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_case_studies_project_id_key`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Migrate existing data (Optional - only if you have data to keep)
-- INSERT INTO `project_case_studies` (project_id, problem, solution, result, updated_at)
-- SELECT id, problem, solution, result, updated_at FROM `projects` 
-- WHERE problem IS NOT NULL OR solution IS NOT NULL OR result IS NOT NULL;

-- 3. Add foreign key constraint
ALTER TABLE `project_case_studies` ADD CONSTRAINT `project_case_studies_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 4. Remove columns from projects table
ALTER TABLE `projects` DROP COLUMN `problem`;
ALTER TABLE `projects` DROP COLUMN `solution`;
ALTER TABLE `projects` DROP COLUMN `result`;
