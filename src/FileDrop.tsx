import type { DragEvent } from "react"

function isNative() {
  return typeof (window as { Capacitor?: unknown }).Capacitor !== "undefined"
}

export default function FileDrop() {

  async function uploadFile(file: File) {

    try {

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("http://10.64.123.42:3001/upload", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      alert("Saved (server): " + data.file)

    } catch (err) {

      console.error(err)
      alert("Server upload failed")

    }

  }

  async function saveNative(file: File) {

    try {

      const { Filesystem, Directory } = await import("@capacitor/filesystem")

      const base64 = await fileToBase64(file)

      // ensure folder exists
      await Filesystem.mkdir({
        path: "LifeSiteFolder",
        directory: Directory.Documents,
        recursive: true
      })

      await Filesystem.writeFile({
        path: `LifeSiteFolder/${file.name}`,
        data: base64,
        directory: Directory.Documents
      })

      console.log("Saved locally:", file.name)
      alert("Saved locally: " + file.name)

    } catch (err) {

      console.error("Native save failed:", err)
      alert("Native save failed — check console")

    }

  }

  async function saveFile(file: File) {

    console.log("Detected environment:", isNative() ? "native" : "web")

    if (isNative()) {

      alert("Running native storage")
      await saveNative(file)

    } else {

      alert("Running server upload")
      await uploadFile(file)

    }

  }

  async function handleDrop(e: DragEvent<HTMLDivElement>) {

    e.preventDefault()

    const file = e.dataTransfer.files[0]

    if (file) saveFile(file)

  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files?.[0]

    if (file) saveFile(file)

  }

  return (

    <div>

      <div
        onDragOver={(e)=>e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border:"2px dashed gray",
          padding:"120px",
          textAlign:"center",
          marginBottom:"30px"
        }}
      >
        Drop file here (desktop)
      </div>

      <input
        type="file"
        onChange={handleFileSelect}
      />

    </div>

  )
}

function fileToBase64(file: File): Promise<string> {

  return new Promise((resolve, reject) => {

    const reader = new FileReader()

    reader.onload = () => resolve((reader.result as string).split(",")[1])

    reader.onerror = reject

    reader.readAsDataURL(file)

  })

}