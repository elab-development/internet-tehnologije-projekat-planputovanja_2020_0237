<!-- resources/views/pdf/export.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planovi putovanja PDF</title>
</head>
<body>
    <h1>Planovi putovanja</h1>

    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Destination ID</th>
                <th>Duration</th>
                <th>Budget</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            @foreach($plan_putovanjas as $planPutovanja)
                <tr>
                    <td>{{ $planPutovanja->id }}</td>
                    <td>{{ $planPutovanja->user_id }}</td>
                    <td>{{ $planPutovanja->destination_id }}</td>
                    <td>{{ $planPutovanja->duration }}</td>
                    <td>{{ $planPutovanja->budget }}</td>
                    <td>{{ $planPutovanja->date }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
