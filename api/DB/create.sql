DECLARE @name = "LunchBoxDataDB"
IF NOT EXISTS (@name)
BEGIN
    PRINT "Creating: " + @name
    CREATE DATABASE @name;
    CREATE TABLE IF NOT EXISTS offers;
        
    CREATE TABLE IF NOT EXISTS providers;
END

