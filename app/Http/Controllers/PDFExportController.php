<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\PlanPutovanja;

class PDFExportController extends Controller
{
    public function exportPDF()
    {
        $plan_putovanjas = PlanPutovanja::all();

        $pdf = PDF::loadView('pdf.export', ['plan_putovanjas' => $plan_putovanjas]);

        return $pdf->download('planovi_putovanja.pdf');
    }
}
