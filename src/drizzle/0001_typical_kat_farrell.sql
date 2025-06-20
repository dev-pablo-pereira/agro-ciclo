CREATE TABLE `areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_user` integer NOT NULL,
	`name` text NOT NULL,
	`color` text,
	FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `coordinates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_area` integer NOT NULL,
	`latitude` integer NOT NULL,
	`longitude` integer NOT NULL,
	FOREIGN KEY (`id_area`) REFERENCES `areas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cultivations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_area` integer,
	`id_product` integer,
	FOREIGN KEY (`id_area`) REFERENCES `areas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_product`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `harvests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`season` text NOT NULL,
	`start` text NOT NULL,
	`end` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`spacing` integer NOT NULL,
	`germination` integer NOT NULL,
	`population_ha` integer NOT NULL
);
