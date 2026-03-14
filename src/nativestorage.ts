import { Filesystem, Directory } from "@capacitor/filesystem"

export async function writeFile(name: string, data: string) {

  await Filesystem.writeFile({
    path: `LifeSiteFolder/${name}`,
    data: data,
    directory: Directory.Documents
  })

}
