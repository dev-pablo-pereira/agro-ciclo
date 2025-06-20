PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cultivations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_area` integer NOT NULL,
	`id_product` integer NOT NULL,
	`id_harvest` integer,
	FOREIGN KEY (`id_area`) REFERENCES `areas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_harvest`) REFERENCES `harvests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cultivations`("id", "id_area", "id_product", "id_harvest") SELECT "id", "id_area", "id_product", "id_harvest" FROM `cultivations`;--> statement-breakpoint
DROP TABLE `cultivations`;--> statement-breakpoint
ALTER TABLE `__new_cultivations` RENAME TO `cultivations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;