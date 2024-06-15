export interface IBook {
	name: string;
	authors: string[];
	image: string;
	publishedDate: string;
	description: string;
}

export interface IBookInput {
	name: string;
	authors: string;
	image: string;
	publishedDate: string;
	description: string;
}
