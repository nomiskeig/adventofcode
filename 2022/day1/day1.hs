import System.IO


main :: IO  ()
main = do
    fileHandle <- openFile "file1.txt" ReadMode
    contents <- hGetContents fileHandle
    putStrLn contents
    hClose fileHandle





