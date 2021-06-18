import { customHeading, Wrapper } from "../../components";
import {
  Grid,
  Flex,
  IconButton,
  Stack,
  Checkbox,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/core";

import create from "zustand";
import produce from "immer";
import { set as setLodash, unset, update, remove } from "lodash";
import { useDimensions } from "../../utils";

const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

const useStore = create(
  immer((set) => ({
    items: {
      value: "Total Assets",
      weight: 100,
      children: [
        {
          value: "Debt",
          weight: 20,
          children: [
            {
              value: "EPF",
              weight: 20,
            },
            {
              value: "Liquid Funds",
              weight: 80,
            },
          ],
        },
        {
          value: "Equity",
          weight: 80,
        },
      ],
    },

    labels: true,
    toggleLabels: () => set((state) => ({ labels: !state.labels })),
    addSibling: (path, breadth) => {
      const newPath = path.slice(0, -3) + `[${breadth}]`;

      set((state) => {
        setLodash(state.items, newPath, {
          value: "Dummy",
          weight: 10,
        });
      });
    },
    addChild: (path) => {
      const newPath = path + `.children[0]`;

      set((state) => {
        setLodash(state.items, newPath, {
          value: "Dummy",
          weight: 10,
        });
      });
    },
    editProp: (path, value, prop) => {
      set((state) => {
        setLodash(state.items, path + `.${prop}`, value);
      });
    },
    deleteItem: (path) => {
      const newPath = path.slice(0, -3);
      set((state) => {
        unset(state.items, path);
        update(state.items, newPath, remove);
      });
    },
  }))
);

export const meta = {
  title: "Asset Allocation Planner",
  slug: "/tools/planner",
};

const H1 = customHeading(1);
const H2 = customHeading(2);
const H3 = customHeading(3);

const AssetItem = ({ item, path, breadth, leafWeight }) => {
  const { value, weight } = item;

  const labels = useStore((state) => state.labels);
  const addSibling = useStore((state) => state.addSibling);
  const addChild = useStore((state) => state.addChild);
  const editProp = useStore((state) => state.editProp);
  const deleteItem = useStore((state) => state.deleteItem);

  return (
    <Grid
      alignItems="center"
      placeContent="stretch"
      backgroundColor={weight === 0 ? "red.200" : "green.200"}
      fontWeight="600"
      fontSize="xl"
      textAlign="center"
      gridTemplateColumns="minmax(auto, 1fr)"
      gridTemplateRows="minmax(auto, 1fr)"
    >
      <div>
        <Editable
          value={value}
          onChange={(value) => editProp(path, value, "value")}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Editable
          value={labels ? weight : leafWeight}
          onChange={(value) => editProp(path, value, "weight")}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>

        {labels && (
          <>
            <IconButton
              variantColor="teal"
              icon="small-add"
              onClick={() => addChild(path)}
            ></IconButton>
            <IconButton
              icon="add"
              onClick={() => addSibling(path, breadth)}
            ></IconButton>
            <IconButton
              variantColor="red"
              icon="delete"
              onClick={() => deleteItem(path)}
            ></IconButton>
          </>
        )}
      </div>
    </Grid>
  );
};

const AssetList = ({ item, depth, leafWeight }) => {
  const [ref, { width, height }] = useDimensions({});

  const labels = useStore((state) => state.labels);

  const { children, value } = item;

  const orientProp =
    height >= width
      ? {
          gridTemplateRows: `${children.reduce(
            (a, { weight }) => a + ` minmax(auto, ${weight}fr)`,
            ""
          )}`,
        }
      : {
          gridTemplateColumns: `${children.reduce(
            (a, { weight }) => a + ` minmax(auto, ${weight}fr)`,
            ""
          )}`,
        };

  return (
    <Stack textAlign="center">
      {labels && <p>{value}</p>}
      <Grid
        ref={ref}
        flexGrow={1}
        padding={labels ? 2 : 0}
        alignItems="stretch"
        justifyItems="stretch"
        gap={2}
        {...orientProp}
      >
        {children.map(constructListItem(depth, children.length, leafWeight))}
      </Grid>
    </Stack>
  );
};

const constructListItem = (depth, breadth, leafWeight) => (item, index) => {
  if (item.children?.length > 0) {
    const currDepth = depth + `[${index}].children`;
    return (
      <AssetList
        key={index}
        depth={currDepth}
        item={item}
        leafWeight={(leafWeight * item.weight) / 100}
      />
    );
  } else {
    const path = depth + `[${index}]`;
    return (
      <AssetItem
        path={path}
        breadth={breadth}
        key={index}
        item={item}
        leafWeight={(leafWeight * item.weight) / 100}
      />
    );
  }
};

export default function Planner() {
  const items = useStore((state) => state.items);

  const [labels, toggleLabels] = useStore((state) => [
    state.labels,
    state.toggleLabels,
  ]);
  return (
    <Wrapper>
      <H1>Asset Allocation</H1>
      <Checkbox isChecked={labels} onChange={toggleLabels}>
        Show Labels
      </Checkbox>
      <Grid
        backgroundColor="blue.100"
        gridTemplateRows="minmax(65vh, 1fr)"
        gridTemplateColumns="minmax(auto, 1fr)"
      >
        <AssetList item={items} depth="children" leafWeight={100} />
      </Grid>
    </Wrapper>
  );
}
