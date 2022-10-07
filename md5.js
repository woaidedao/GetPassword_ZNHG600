static readonly MD5 _mD5 = MD5.Create();
const string _hash = "1c2b4ca00d293199725694957a171a3b";//将乱码填入其中

private static void GetPassword()
{
    for (int i = 99999999; i >= 0; i--)
    {
        Console.WriteLine($"尝试值{i}");
        if (VerifyHash(i))
        {
            Console.WriteLine($"超级密码为：telecomadmin{i}");
            break;
        }
    }
}

private static string GetHash(string input)
{
    byte[] inputBytes = Encoding.ASCII.GetBytes(input);
    byte[] hashBytes = _mD5.ComputeHash(inputBytes);

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < hashBytes.Length; i++)
    {
        sb.Append(hashBytes[i].ToString("X2"));
    }
    return sb.ToString();
}

private static bool VerifyHash(int i)
{
    var input = "telecomadmin";

    if (i < 10)
    {
        input += "0000000" + i.ToString();
    }
    else if (i < 100)
    {
        input += "000000" + i.ToString();
    }
    else if (i < 1000)
    {
        input += "00000" + i.ToString();
    }
    else if (i < 10000)
    {
        input += "0000" + i.ToString();
    }
    else if (i < 100000)
    {
        input += "000" + i.ToString();
    }
    else if (i < 1000000)
    {
        input += "00" + i.ToString();
    }
    else if (i < 10000000)
    {
        input += "0" + i.ToString();
    }
    else if (i < 100000000)
    {
        input += i.ToString();
    }

    var hashOfInput = GetHash(input);

    StringComparer comparer = StringComparer.OrdinalIgnoreCase;

    return comparer.Compare(hashOfInput, _hash) == 0;
}
