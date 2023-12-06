
module Lib
    ( someFunc
    ) where

import System.IO
import Data.List.Split
someFunc :: IO ()
someFunc = do 
    fileHandle <- openFile "/home/simon/dev/adventofcode/2022/day1/file1.txt" ReadMode
    contents <- hGetContents fileHandle
    putStrLn contents
    print $ solve contents
    hClose fileHandle


solve :: String -> String
solve s= head splitOn "\n" s




