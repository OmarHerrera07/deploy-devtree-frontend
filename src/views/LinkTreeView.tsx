import { useEffect, useState, type ChangeEvent } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/DevTree";
import type { SocialNetwork, User } from "../types";

export const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: ({ message }) => {
      toast.error(message);
    },
    onSuccess: (data) => {
      toast.success(data);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  useEffect(() => {
    const updateData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link : SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updateData);
  }, []);

  const handleUrlChangue = (e: ChangeEvent<HTMLInputElement>) => {
    const updateLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevTreeLinks(updateLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (name: string) => {
    const updateLinks = devTreeLinks.map((link) => {
      if (link.name === name) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        }
        toast.error("URL no valida");
      }
      return link;
    });
    setDevTreeLinks(updateLinks);

    let updateItems: SocialNetwork[] = [];
    const selectedSocialNetwork = updateLinks.find(
      (link) => link.name === name
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;

      if (links.some((link) => link.name === name)) {
        updateItems = links.map((link) => {
          if (link.name === name) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id
        };
        updateItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex((link) => link.name === name);

      updateItems = links.map((link) => {
        if (link.name == name) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (link.id > indexToUpdate && ( indexToUpdate !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    console.log(updateItems);
    //Setear datos en datos cacheados
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updateItems),
      };
    });
  };

  return (
    <div className="space-y5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChangue={handleUrlChangue}
          handleEnableLink={handleEnableLink}
        />
      ))}

      <button
        onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
      >
        Guardar cambios
      </button>
    </div>
  );
};
