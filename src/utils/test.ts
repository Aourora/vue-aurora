import { ColumnProps, PostProps } from "./props";

export const testColumnData: ColumnProps[] = [
  {
    id: 1,
    title: "test1",
    description: "这是描述",
  },
  {
    id: 2,
    title: "test2",
    description:
      "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
    avatar: "",
  },
  { id: 3, title: "test3", description: "这是描述", avatar: "" },
  { id: 4, title: "test4", description: "这是描述", avatar: "" },
  { id: 5, title: "test5", description: "这是描述", avatar: "" },
];

export const testUserData = {
  isLogin: false,
  name: "Aurora",
};

export const testPostData: PostProps[] = [
  {
    id: 1,
    title: "Aurora专栏",
    content:
      "这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试",
    createdAt: "2022-3-12",
    columnId: 1,
  },
  {
    id: 2,
    title: "Aurora专栏",
    content:
      "这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试",
    createdAt: "2022-3-12",
    columnId: 2,
  },
  {
    id: 3,
    title: "Aurora专栏",
    content:
      "这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试",
    createdAt: "2022-3-12",
    columnId: 3,
  },
  {
    id: 4,
    title: "Aurora专栏",
    content:
      "这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试",
    createdAt: "2022-3-12",
    columnId: 4,
  },
];
