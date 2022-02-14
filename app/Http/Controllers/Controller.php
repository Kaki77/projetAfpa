<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function handleResponse($data,$msg){
        $res=[
            'success'=>true,
            'data'=>$data,
            'message'=>$msg,
        ];
        return response()->json($res,200);
    }

    public function handleError($error,$errorMsg=[],$code=404){
        $res=[
            'success'=>false,
            'message'=>$error
        ];
        if(!empty($errorMsg)){
            $res['data']=$errorMsg;
        };
        return response()->json($res,$code);
        
    }
}
