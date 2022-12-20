<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $difficulty=rand(1,3);
            $difficulty_number=$difficulty;
            switch ($difficulty) {
                case '1':
                    $difficulty="easy";
                    break;
                case '2':
                    $difficulty="medium";
                    break;
                case '3':
                    $difficulty="hard";
                    break;
                default:

                    break;
            }
           ;

            DB::table('games')->where('id',0)->update(['json' => Http::get('https://the-trivia-api.com/api/questions?limit=10&difficulty='.$difficulty)]);
            DB::table('games')->where('id',0)->update(['difficulty' => $difficulty_number]);
            DB::table('puntuacions')->where('idGame',0)->delete();
        })->dailyAt('23:29');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

}
