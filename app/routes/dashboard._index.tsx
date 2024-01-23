import React, { ReactElement } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const status = {
  READY: "Disponible",
  OCCUPIED: "Ocupada",
  OOS: "Fuera de servicio",
} as const;

type Status = keyof typeof status;

type Room = {
  id: number;
  number: number;
  status: keyof typeof status;
  type: string;
};

const rooms: Room[] = [
  { id: 1, number: 101, status: "READY", type: "Suite" },
  { id: 2, number: 102, status: "OCCUPIED", type: "Suite doble" },
  { id: 3, number: 103, status: "READY", type: "Suite" },
  { id: 4, number: 104, status: "OOS", type: "Suite lujosa" },
];

const statusColor = (roomStatus: Status) => {
  if (roomStatus === "OCCUPIED") return "text-red-700";
  if (roomStatus === "READY") return "text-green-700";
  return "text-gray-700";
};

export default function Index() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">La Playa</h1>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
        {rooms.map((room) => (
          <RoomCard room={room} />
        ))}
      </div>
    </>
  );
}

function RoomCard({ room }: { room: Room }) {
  const RoomCardBody = roomCards[room.status];
  return (
    <Card className="min-w-72">
      <CardHeader>
        <CardTitle>Habitación {room.number}</CardTitle>
        <CardDescription>{room.type}</CardDescription>
      </CardHeader>
      {<RoomCardBody room={room} />}
    </Card>
  );
}

const roomCards: Record<
  Status,
  ({ room }: { room: Room }) => React.JSX.Element
> = {
  READY: AvailableRoomCard,
  OCCUPIED: OccupiedRoom,
  OOS: OutOfServiceRoom,
};

function AvailableRoomCard({ room }: { room: Room }) {
  return (
    <>
      <CardContent>
        <p className="text-2xl text-green-700">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4">
          <Button className="flex-auto">Rentar</Button>
          <Button variant="outline" className="flex-auto">
            Bloquear
          </Button>
        </div>
      </CardFooter>
    </>
  );
}

function OccupiedRoom({ room }: { room: Room }) {
  return (
    <>
      <CardContent>
        <p className="text-2xl text-red-700">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4">
          <Button className="flex-auto">Liberar</Button>
        </div>
      </CardFooter>
    </>
  );
}

function OutOfServiceRoom({ room }: { room: Room }) {
  return (
    <>
      <CardContent>
        <p className="text-2xl text-gray-700">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-4">
          <Button className="flex-auto">Desbloquear</Button>
        </div>
      </CardFooter>
    </>
  );
}
