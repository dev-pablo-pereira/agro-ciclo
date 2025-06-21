PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`spacing` integer NOT NULL,
	`germination` integer NOT NULL,
	`population_ha` integer NOT NULL,
	`pms` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "spacing", "germination", "population_ha", "pms") SELECT "id", "name", "spacing", "germination", "population_ha", "pms" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;