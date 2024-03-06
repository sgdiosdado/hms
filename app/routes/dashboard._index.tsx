import { DotsVerticalIcon } from "@radix-ui/react-icons";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const status = {
  READY: "Disponible",
  OCCUPIED: "Ocupada",
  OOS: "Fuera de servicio",
  CLEANING: "Limpieza",
} as const;

type Status = keyof typeof status;

type Room = {
  id: number;
  number: number;
  status: keyof typeof status;
  type: string;
  price: number;
};

const rooms: Room[] = [
  { id: 1, number: 101, status: "READY", type: "Suite", price: 120.0 },
  { id: 2, number: 102, status: "OCCUPIED", type: "Suite doble", price: 120.0 },
  { id: 3, number: 103, status: "READY", type: "Suite", price: 120.0 },
  { id: 4, number: 104, status: "OOS", type: "Suite lujosa", price: 120.0 },
  { id: 5, number: 105, status: "OOS", type: "Suite lujosa", price: 120.0 },
  {
    id: 6,
    number: 106,
    status: "CLEANING",
    type: "Suite lujosa",
    price: 120.0,
  },
];

export default function Index() {
  return (
    <Tabs defaultValue="rooms">
      <TabsList>
        <TabsTrigger value="rooms">Habitaciones</TabsTrigger>
        <TabsTrigger value="kitchen">Cocina</TabsTrigger>
        <TabsTrigger value="metrics">Métricas</TabsTrigger>
      </TabsList>
      <TabsContent value="rooms">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

function RoomCard({ room }: { room: Room }) {
  const RoomCardBody = roomCards[room.status];
  return (
    <Card className="min-w-72">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Habitación {room.number}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-auto">
              <DotsVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Borrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
  CLEANING: CleaningRoom,
};

const currencyFormatter = new Intl.NumberFormat("es-mx", {
  style: "currency",
  currency: "MXN",
});

function AvailableRoomCard({ room }: { room: Room }) {
  return (
    <>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight">
          {currencyFormatter.format(room.price)}
        </p>
        <p className="text-sm text-green-600">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2">
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
        <p className="text-3xl font-bold tracking-tight">
          {currencyFormatter.format(room.price)}
        </p>
        <p className="text-sm text-red-600">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2">
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
        <p className="text-3xl font-bold tracking-tight">
          {currencyFormatter.format(room.price)}
        </p>
        <p className="text-sm text-gray-600">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2">
          <Button className="flex-auto">Desbloquear</Button>
        </div>
      </CardFooter>
    </>
  );
}

function CleaningRoom({ room }: { room: Room }) {
  return (
    <>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight">
          {currencyFormatter.format(room.price)}
        </p>
        <p className="text-sm text-yellow-600">{status[room.status]}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2">
          <Button className="flex-auto">Terminar limpieza</Button>
        </div>
      </CardFooter>
    </>
  );
}
