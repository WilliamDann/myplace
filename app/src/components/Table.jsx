function toTitleCase(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// turn an object into a table
export default function(data)
{
    if (!data) return;

    const renderValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <table className="ml-4 border border-gray-300">
                <tbody>
                {Object.entries(value).map(([key, val]) => (
                    <tr key={key}>
                    <td className="border px-2 py-1 font-medium">{key}</td>
                    <td className="border px-2 py-1">{renderValue(val)}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            );
        }
        return value?.toString();
    };
    
    return (
        <table>

        <tbody>
            {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                <td className="text-end fw-bold px-3 font-semibold">{toTitleCase(key)}: </td>
                <td className="text-start">{renderValue(value)}</td>
                </tr>
            ))}
        </tbody>
        </table>
    );
}