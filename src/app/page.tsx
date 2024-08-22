import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex column justify-center">
      <div 
        style={{
          width: '460px', height: '500px', backgroundColor: 'lightgray', padding: 10, 
          borderRadius: '10px', marginLeft:'45px', marginRight: '45px', marginBottom: '45px', 
          marginTop: '45px', display: 'flex', flexDirection: 'column', opacity: '0.8',
          justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{ marginBottom: '100px' }}>
          <Button style={{width:'300px', height: '100px', backgroundColor: '#8B7192', opacity:'1.0'}}> Take the Quiz! </Button>
        </div>
        <div>
          <Button style={{width:'300px', height: '100px'}}> Find a Club! </Button>
        </div>
      </div>
    </div>
  );
}
