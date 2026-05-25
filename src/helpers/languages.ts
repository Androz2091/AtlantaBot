import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";
import fs from "fs/promises";
import type { TFunction } from "i18next";

async function walkDirectory(
	dir: string,
	namespaces: string[] = [],
	folderName = ""
): Promise<{ namespaces: string[]; languages: string[] }> {
	const files = await fs.readdir(dir);
	const languages: string[] = [];

	for (const file of files) {
		const stat = await fs.stat(path.join(dir, file));
		if (stat.isDirectory()) {
			const isLanguage = file.includes("-");
			if (isLanguage) languages.push(file);
			const folder = await walkDirectory(
				path.join(dir, file),
				namespaces,
				isLanguage ? "" : `${file}/`
			);
			namespaces = folder.namespaces;
		} else {
			namespaces.push(`${folderName}${file.substring(0, file.length - 5)}`);
		}
	}

	return { namespaces: [...new Set(namespaces)], languages };
}

export default async function loadLanguages(): Promise<Map<string, TFunction>> {
	const loadPath = path.resolve(process.cwd(), "languages/{{lng}}/{{ns}}.json");

	const { namespaces, languages } = await walkDirectory(
		path.resolve(process.cwd(), "languages/")
	);

	i18next.use(Backend);

	await i18next.init({
		backend: { loadPath },
		debug: false,
		fallbackLng: "en-US",
		initAsync: false,
		interpolation: { escapeValue: false },
		load: "all",
		ns: namespaces,
		preload: languages,
	});

	return new Map(languages.map((lang) => [lang, i18next.getFixedT(lang)]));
}
