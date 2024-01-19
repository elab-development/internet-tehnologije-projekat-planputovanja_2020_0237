<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\PlanPutovanja;

class PDFExportController extends Controller
{
    public function exportPDF()
    {
        $plans = PlanPutovanja::all();

        $pdf = PDF::loadView('pdf.export', ['plans' => $plans]);

        return $pdf->download('planovi_putovanja.pdf');
    }
}
