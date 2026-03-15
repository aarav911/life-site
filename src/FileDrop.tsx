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

      console.error("Server upload error:", err)
      alert("Server upload failed: " + String(err))

    }

  }

  async function saveNative(file: File) {

    try {

      const { Filesystem, Directory } = await import("@capacitor/filesystem")

      console.log("Filesystem plugin loaded")

      const base64 = await fileToBase64(file)

      console.log("Base64 conversion complete")

      // request permissions (important for iOS)
      const perm = await Filesystem.requestPermissions()
      console.log("Filesystem permissions:", perm)

      // ensure folder exists
      await Filesystem.mkdir({
        path: "LifeSiteFolder",
        directory: Directory.Documents,
        recursive: true
      })

      console.log("Folder ensured")

      await Filesystem.writeFile({
        path: `LifeSiteFolder/${file.name}`,
        data: base64,
        directory: Directory.Documents
      })

      console.log("Saved locally:", file.name)

      alert("Saved locally: " + file.name)

    } catch (err: unknown) {

      console.error("Native save failed:", err)

      let message = "Unknown error"

      if (err instanceof Error) {
        message = err.message
      } else {
        message = JSON.stringify(err)
      }

      alert("Native save failed: " + message)

    }

  }

  async function saveFile(file: File) {

    const native = isNative()

    console.log("Environment:", native ? "native" : "web")

    if (native) {

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

    reader.onload = () => {

      const result = reader.result as string

      resolve(result.split(",")[1])

    }

    reader.onerror = reject

    reader.readAsDataURL(file)

  })

}