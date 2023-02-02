import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  let [categories] = useState({
    로드맵: [
      // {
      //   id: 1,
      //   title: "Does drinking coffee make you smarter?",
      //   date: "5h ago",
      //   commentCount: 5,
      //   shareCount: 2,
      // },
    ],

    블로그: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        {/* 탭 카테고리 리스트 */}
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        {/* 탭 내용 리스트 */}
        <Tab.Panels className="mt-2">
          <div className="p-2 m-2">
            <div className="mb-3">즐겨찾기한 로드맵</div>
            <div className="rounded-xl bg-white p-3 ">
              <div>something</div>
              <div>something</div>
              <div>something</div>
              <div>something</div>
            </div>
          </div>
          <div className="p-2 m-2">
            <div className="mb-3">이수한 노드</div>
            <div className="rounded-xl bg-white p-3 ">
              <div>something</div>
              <div>something</div>
              <div>something</div>
              <div>something</div>
            </div>
          </div>
          <div className="p-2 m-2">
            <div className="mb-3">작성한 리뷰</div>
            <div className="rounded-xl bg-white p-3 ">
              <div>something</div>
              <div>something</div>
              <div>something</div>
              <div>something</div>
            </div>
          </div>
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    {/* <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    /> */}
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
