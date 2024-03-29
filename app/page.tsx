"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import MDEditor from "@uiw/react-md-editor"
import axios from "axios"
import { format } from "date-fns"
import { MessageCircleIcon, MessageSquareIcon } from "lucide-react"
import readingTime from "reading-time"
import rehypeSanitize from "rehype-sanitize"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"

export default function IndexPage() {
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await axios.get("/api/notes")

      return res.data.notes
    },
  })

  console.log(notes)

  return (
    <div className="magicpattern mb-32">
      <div className="h-[100vh] relative py-16 px-8 md:py-24 md:px-32 lg:py-36 lg:px-56">
        <section className="flex flex-col">
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-col max-w-5xl mx-auto mt-16 w-full">
              {/* <Card className="rounded-xl py-8 px-8 w-full">
                <CardTitle>Notes</CardTitle>
                {notes ? (
                  <ul className="mt-8 gap-2 flex flex-col">
                    {notes.map((note: any) => (
                      <Link href={`/note/${note.id}`} key={note.id}>
                        <li
                          key={note.id}
                          className="cursor-pointer hover:opacity-60 transition duration-150"
                        >
                          <h3 className="text-2xl font-semibold">
                            {note.title}
                          </h3>
                        </li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <p>Loading...</p>
                )}
              </Card> */}
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-semibold">Notes</h2>

                <div className="flex items-center gap-4">
                  <Link href="/chat" className={buttonVariants()}>
                    <MessageSquareIcon className="h-4 w-4 mr-1" />
                    Chat
                  </Link>

                  <Link href="/new" className={buttonVariants()}>
                    + New Note
                  </Link>
                </div>
              </div>

              {notes ? (
                <ul className="mt-8 gap-4 flex flex-col">
                  {notes.map((note: any) => (
                    <Link href={`/note/${note.id}`} key={note.id}>
                      <Card>
                        <li
                          key={note.id}
                          className="cursor-pointer hover:opacity-60 transition duration-150"
                        >
                          <h3 className="text-xl font-semibold">
                            {note.title}
                          </h3>
                          <p className="mt-2 text-gray-400">
                            {note.text.length} characters /{" "}
                            {note.text.split(" ").length} words /{" "}
                            {readingTime(note.text).text} / Created at{" "}
                            {format(
                              new Date(note.created_at),
                              "dd MMM yyyy hh:mm a"
                            )}
                          </p>
                          <p className="mt-4 text-gray-400">
                            {note.text.slice(0, 200).trim()}
                            {note.text.length > 200 && "...."}
                          </p>
                        </li>
                      </Card>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
