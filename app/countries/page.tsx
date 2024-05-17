"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function CountriesPage() {
  const [allCountries, setAllCountries] = useState<any[] | null>(null);
  const [countries, setCountries] = useState<any[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("countries").select();

      if (error) {
        console.error("Error fetching countries:", error);
        return;
      }

      setAllCountries(data);
      const start = page * pageSize;
      const end = start - 1 + (pageSize + 1);
      const dt = data.slice(start, end);
      const tp = Math.ceil(data.length / pageSize);
      setCountries(dt);
      setTotalPage(tp);
    };

    getData();
  }, []);

  useEffect(() => {
    if (allCountries) {
      const start = page * pageSize;
      const end = start - 1 + (pageSize + 1);
      const dt = allCountries.slice(start, end);
      const tp = Math.ceil(allCountries.length / pageSize);
      setCountries(dt);
      setTotalPage(tp);
    }
  }, [totalPage, pageSize, page]);

  const getPaginationsNumbers = () => {
    return (
      <>
        {Array.from({ length: totalPage }).map((_, index) => (
          <li
            key={index}
            className={`border-2 px-[10px] w-[50px] h-[50px] py-2 cursor-pointer rounded-full flex justify-center items-center ${
              page === index
                ? " border-green-700 text-green-700 bg-green-100 "
                : index < page - 3
                ? "hidden"
                : index < page + 3
                ? "border-gray-700 text-gray-700 bg-gray-100"
                : "hidden"
            }`}
            onClick={() => {
              togglePage(index);
            }}
          >
            <span>{index + 1}</span>
          </li>
        ))}
      </>
    );
  };

  const getActions = (c: any) => {
    return (
      <>
        <div className="flex justify-center gap-5">
          <span className="px-5 py-1 border-2 rounded-tr-lg rounded-bl-lg border-orange-500 bg-orange-100 text-orange-500 ">
            <button>Edit</button>
          </span>
          <span className="px-5 py-1 border-2 rounded-tr-lg rounded-bl-lg border-red-500 bg-red-100 text-red-500 ">
            <button>Delete</button>
          </span>
        </div>
      </>
    );
  };

  const togglePage = (changePage: number) => {
    console.log("changePage is ", changePage);
    if (changePage <= 0) {
      setPage(0);
      return;
    }
    if (changePage >= totalPage - 1) {
      setPage(totalPage - 1);
      return;
    }
    setPage(changePage);

    return;
  };

  const getPaginations = () => {
    return (
      <>
        <nav className=" flex justify-center w-full">
          <ul className="list-style-none gap-5 flex flex-wrap justify-center">
            <li
              className={
                page === 0
                  ? "hidden"
                  : "border-2 px-[20px] border-gray-700 text-gray-700 bg-gray-100 cursor-pointer py-2 rounded-full flex justify-center items-center "
              }
              onClick={() => {
                togglePage(0);
              }}
            >
              <span>{`<<<`}</span>
            </li>

            <li
              className={
                page === 0
                  ? "hidden"
                  : "border-2 px-[10px] w-[50px] h-[50px] border-gray-700 text-gray-700 bg-gray-100 cursor-pointer py-2 rounded-full flex justify-center items-center"
              }
              onClick={() => {
                togglePage(page - 1);
              }}
            >
              <span>{`<`}</span>
            </li>
            {getPaginationsNumbers()}
            <li
              className={
                page === totalPage - 1
                  ? "hidden"
                  : "border-2 px-[10px] w-[50px] h-[50px] border-gray-700 text-gray-700 bg-gray-100 cursor-pointer py-2 rounded-full flex justify-center items-center"
              }
              onClick={() => {
                togglePage(page + 1);
              }}
            >
              <span>{`>`}</span>
            </li>
            <li
              className={
                page === totalPage - 1
                  ? "hidden"
                  : "border-2 px-[20px] border-gray-700 text-gray-700 bg-gray-100 cursor-pointer py-2 rounded-full flex justify-center items-center"
              }
              onClick={() => {
                togglePage(totalPage);
              }}
            >
              <span>{`>>>`}</span>
            </li>
          </ul>
        </nav>
      </>
    );
  };

  return (
    <>
      <div className="mx-2 my-2 w-[calc(100%-16px)] h-[calc(100%-16px)] flex flex-col gap-5">
        <h1 className="text-center text-4xl pt-10 mb-5 font-bold">Country List</h1>

        <div className="flex justify-center">
          <div className="w-[90%] flex flex-col gap-5 justify-center items-center border-2 rounded-lg px-5 py-10 shadow-2 shadow-sm shadow-gray-500">
            {getPaginations()}
            <div className="w-[90%] flex justify-center items-center overflow-y-auto ">
              {countries?.length > 0 ? (
                <>
                  <table className="border-2 border-red-500 w-[100%] h-[calc(100%-90px)] ">
                    <thead className="border-2 border-red-500">
                      <th className="border-x-2 border-x-red-500 py-2 text-center w-[5%]">
                        Sr no
                      </th>
                      <th className="border-x-2 border-x-red-500 text-center w-[32.5%]">
                        Name
                      </th>
                      <th className="border-x-2 border-x-red-500 text-center w-[32.5%]">
                        Locale Name
                      </th>
                      <th className="border-x-2 border-x-red-500 text-center w-[5%]">
                        Iso2
                      </th>
                      <th className="border-x-2 border-x-red-500 text-center w-[5%]">
                        Iso3
                      </th>
                      <th className="border-x-2 border-x-red-500 text-center w-[20%]">
                        Actions
                      </th>
                    </thead>
                    <tbody className="border-2 border-red-500">
                      {countries?.map((c) => {
                        return (
                          <>
                            <tr className="border-2 border-red-300">
                              <td className="border-x-2 border-x-red-300 text-center">
                                {c.id}
                              </td>
                              <td className="border-x-2 border-x-red-300 text-center">
                                {c.name}
                              </td>
                              <td className="border-x-2 border-x-red-300 text-center">
                                {c.local_name}
                              </td>
                              <td className="border-x-2 border-x-red-300 text-center">
                                {c.iso2}
                              </td>
                              <td className="border-x-2 border-x-red-300 text-center">
                                {c.iso3}
                              </td>
                              <td className="border-x-2 border-x-red-300 text-center py-1 flex justify-center">
                                {getActions(c)}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center">
                    <h1>No Data Available</h1>
                  </div>
                </>
              )}
            </div>
            {getPaginations()}
          </div>
        </div>
      </div>
    </>
  );
}
