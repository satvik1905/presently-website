"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import usePlacesAutocomplete, {
  getDetails,
} from "use-places-autocomplete";
import * as Popover from "@radix-ui/react-popover";

export interface AddressParts {
  street: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
}

interface Props {
  onSelect: (address: AddressParts) => void;
  value: string;
  onChange: (value: string) => void;
}

let loaderPromise: Promise<void> | null = null;

function ensureMapsLoaded(): Promise<void> {
  if (loaderPromise) return loaderPromise;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!key) {
    loaderPromise = Promise.resolve();
    return loaderPromise;
  }
  setOptions({ key });
  loaderPromise = importLibrary("places").then(() => {});
  return loaderPromise;
}

function parseAddressComponents(
  components: google.maps.GeocoderAddressComponent[]
): Omit<AddressParts, "formatted"> {
  let streetNumber = "";
  let route = "";
  let city = "";
  let state = "";
  let zip = "";

  for (const c of components) {
    const t = c.types[0];
    if (t === "street_number") streetNumber = c.long_name;
    else if (t === "route") route = c.long_name;
    else if (t === "locality") city = c.long_name;
    else if (t === "administrative_area_level_1") state = c.short_name;
    else if (t === "postal_code") zip = c.long_name;
  }

  return {
    street: [streetNumber, route].filter(Boolean).join(" "),
    city,
    state,
    zip,
  };
}

/** Wrapper that waits for Maps API, then renders the actual autocomplete */
export default function AddressAutocomplete(props: Props) {
  const [mapsReady, setMapsReady] = useState(false);

  useEffect(() => {
    ensureMapsLoaded().then(() => setMapsReady(true));
  }, []);

  if (!mapsReady) {
    return (
      <input
        type="text"
        className="w-full font-[inherit] text-sm py-3 px-3.5 border border-[#E7E5DF] rounded-[8px] text-[#101828] bg-white transition-[border-color] duration-150 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_0_3px_#EEF3FE] placeholder:text-[#B0B5BE]"
        placeholder="Loading address search..."
        disabled
      />
    );
  }

  return <AddressInput {...props} />;
}

/** Inner component — only mounts after google.maps.places is available */
function AddressInput({ onSelect, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    suggestions: { data },
    setValue: setQuery,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["address"],
      componentRestrictions: { country: "us" },
    },
    debounce: 250,
  });

  function handleInputChange(val: string) {
    onChange(val);
    setQuery(val);
    setOpen(val.length > 2);
    setActiveIndex(-1);
  }

  async function handleSelect(placeId: string, description: string) {
    onChange(description);
    setQuery(description, false);
    clearSuggestions();
    setOpen(false);

    try {
      const details = await getDetails({
        placeId,
        fields: ["address_components"],
      });

      if (details && typeof details !== "string" && details.address_components) {
        const parts = parseAddressComponents(details.address_components);
        onSelect({ ...parts, formatted: description });
      } else {
        onSelect({ street: "", city: "", state: "", zip: "", formatted: description });
      }
    } catch {
      onSelect({ street: "", city: "", state: "", zip: "", formatted: description });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || data.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % data.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const item = data[activeIndex];
      handleSelect(item.place_id, item.description);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showDropdown = open && data.length > 0;

  return (
    <Popover.Root open={showDropdown} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <input
          ref={inputRef}
          type="text"
          className="w-full font-[inherit] text-sm py-3 px-3.5 border border-[#E7E5DF] rounded-[8px] text-[#101828] bg-white transition-[border-color] duration-150 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_0_3px_#EEF3FE] placeholder:text-[#B0B5BE]"
          placeholder="Start typing an address..."
          required
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (value.length > 2 && data.length > 0) setOpen(true);
          }}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `address-option-${activeIndex}` : undefined}
        />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          side="bottom"
          align="start"
          sideOffset={4}
          style={{
            width: "var(--radix-popover-trigger-width)",
            maxHeight: 240,
            overflowY: "auto",
            background: "#fff",
            border: "1px solid var(--color-line)",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(16,24,40,0.12)",
            zIndex: 200,
            padding: "4px 0",
          }}
          role="listbox"
        >
          {data.map((suggestion, i) => (
            <div
              key={suggestion.place_id}
              id={`address-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              style={{
                padding: "10px 14px",
                fontSize: 14,
                cursor: "pointer",
                background: i === activeIndex ? "#F3F4F6" : "transparent",
                color: "var(--color-ink)",
                transition: "background 0.1s",
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(suggestion.place_id, suggestion.description);
              }}
            >
              {suggestion.description}
            </div>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
