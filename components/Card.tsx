import Image from "next/image";
import { ReactNode } from "react";

export default function Card(props: {
  children: ReactNode; title: string; avatar: string; 
}) {
  return (
    <div className="flex flex-col rounded-md p-5 mt-5 border-gray-300 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src={props.avatar} alt="Image" width={20} height={20} className="rounded-full mr-4" />
          <h3 className="text-lg font-semibold">{props.title}</h3>
          
        </div>
        <div></div>
      </div>
      <div className="flex-1 card-body">
        {props.children}
      </div>
    </div>
  )
}