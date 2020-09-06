import { customHeading, Wrapper } from "../../components";
import { Grid, Flex, IconButton, Stack, Checkbox } from "@chakra-ui/core";

import create from "zustand";
import produce from "immer";
import { set as setLodash } from "lodash";
import { useDimensions } from "../../utils";

const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);

const useStore = create(
  immer((set) => ({
    items: [
      {
        value: "Debt",
        weight: 0.2,
      },
      {
        value: "Equity",
        weight: 0.8,
      },
    ],
    labels: true,
    toggleLabels: () => set((state) => ({ labels: !state.labels })),
    addSibling: (path, breadth) => {
      const newPath = path.slice(0, -3) + `[${breadth}]`;

      set((state) => {
        setLodash(state.items, newPath, {
          value: "Dummy",
          weight: 1,
        });
      });
    },
    addChild: (path) => {
      const newPath = path + `.children[0]`;

      set((state) => {
        setLodash(state.items, newPath, {
          value: "Dummy",
          weight: 1,
        });
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

const AssetItem = ({ item, path, breadth }) => {
  const { value, weight } = item;

  const addSibling = useStore((state) => state.addSibling);
  const addChild = useStore((state) => state.addChild);

  return (
    <Grid
      justifyItems="stretch"
      alignItems="stretch"
      backgroundColor={weight === 0 ? "red.200" : "green.200"}
      fontWeight="600"
      fontSize="xl"
      textAlign="center"
      gridTemplateColumns="minmax(auto, 1fr)"
      gridTemplateRows="minmax(auto, 1fr)"
    >
      <div>
        <p contentEditable>{value}</p>
        <IconButton
          variantColor="teal"
          icon="small-add"
          onClick={() => addChild(path)}
        ></IconButton>
        <IconButton
          icon="add"
          onClick={() => addSibling(path, breadth)}
        ></IconButton>
      </div>
    </Grid>
  );
};

const AssetList = ({ item, depth }) => {
  const [ref, { width, height }] = useDimensions({});

  const labels = useStore((state) => state.labels);

  const { children, value } = item;

  const orientProp =
    height >= width
      ? {
          gridTemplateRows: `${children.reduce(
            (a, { weight }) => a + ` minmax(auto, ${100 * weight}fr)`,
            ""
          )}`,
        }
      : {
          gridTemplateColumns: `${children.reduce(
            (a, { weight }) => a + ` minmax(auto, ${100 * weight}fr)`,
            ""
          )}`,
        };

  return (
    <Stack textAlign="center">
      {labels && <p contentEditable>{value}</p>}
      <Grid
        ref={ref}
        flexGrow={1}
        padding={labels ? 2 : 0}
        alignItems="stretch"
        justifyItems="stretch"
        gap={2}
        {...orientProp}
      >
        {children.map(constructListItem(depth, children.length))}
      </Grid>
    </Stack>
  );
};

const constructListItem = (depth, breadth) => (item, index) => {
  if (item.children) {
    const currDepth = depth + `[${index}].children`;
    return <AssetList key={index} depth={currDepth} item={item} />;
  } else {
    const path = depth + `[${index}]`;
    return <AssetItem path={path} breadth={breadth} key={index} item={item} />;
  }
};

const AssetMap = () => {
  const items = useStore((state) => state.items);
  console.log(items);

  return (
    <AssetList
      item={{ value: "Total Assets", weight: 1, children: items }}
      depth={""}
    />
  );
};

export default function Planner() {
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
        <AssetMap />
      </Grid>
    </Wrapper>
  );
}
