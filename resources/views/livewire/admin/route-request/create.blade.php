<div>
    <div  wire:target="store" wire:loading.class="skeleton" class="p-2">
        <div
            class="font-semibold text-transparent divider divider-info bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                {{ $divider }}
        </div>
        <form wire:submit.prevent='store'>
            @csrf
            <div class="w-full max-w-xs sm:max-w-sm xl:max-w-xl form-control">
                <x-label-req :value="__('route name')" />
                <x-input wire:model.blur='route_name' :error="$errors->get('route_name')" />
                <x-label-error :messages="$errors->get('route_name')" />
            </div>
            <div class="w-full max-w-xs sm:max-w-sm xl:max-w-xl form-control">
                <x-label-req :value="__('Workflow Template')" />
                <x-select wire:model='workflow_template_id' :error="$errors->get('workflow_template_id')">
                    <option value="" selected>Select an option</option>
                    @foreach ($Workflow_template as $wt)
                        <option value="{{ $wt->id }}">
                            {{ $wt->workflow_template_name }}</option>
                    @endforeach
                </x-select>
                <x-label-error :messages="$errors->get('workflow_template_id')" class="mt-0" />
            </div>
            <div class="modal-action">
                <x-btn-save wire:target="store" wire:loading.class="btn-disabled">{{ __('Save') }}</x-btn-save>
                <x-btn-close wire:target="store" wire:loading.class="btn-disabled" wire:click="$dispatch('closeModal')"
                    >{{ __('Close') }}</x-btn-close>
            </div>
        </form>
    </div>
</div>
